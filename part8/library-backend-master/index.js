const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1 } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book') 
const User = require('./models/user')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const {PubSub}  = require('apollo-server')
const pubsub = new PubSub()
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
      console.log("connected to mongodb")
    })
    .catch(error=>{
      console.log("error connecting to mongodb", error.message)
    })

const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
      title: String!,
      published: Int!,
      author: Author!,
      id: ID!,
      genres: [String!]!
  }

  type Author {
      name:  String!,
      id: ID!,
      born: Int
      bookCount: Int!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!,
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
      addBook(
          title: String!, 
          author: String!, 
          published: Int!, 
          genres: [String!]!
        ): Book!
    
      editAuthor(
          name: String!,
          setBornTo: Int!
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          if (!args.author && !args.genre){
              return Book.find({}).populate('author')
          } //paramters are not done yet, have to use find with $in [args.condition]
          else if (args.author && !args.genre){
            // find author id from the given name
              const authors = await Author.find({name: args.author})
              const author_id = authors[0]._id
              
              return await Book.find({author: author_id}).populate('author')
          }
              
          else if (!args.author && args.genre){
              return Book.find({genres: args.genre}).populate('author')
          }
          else {
            // extract author id from given name
            const authors = await Author.find({name: args.author})
            const author_id = authors[0]._id

            return await Book.find({author: author_id, genres: args.genre}).populate('author')
          }
      },
      allAuthors: () => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Mutation: {
      addBook: async (root, args, {currentUser}) => {
          if (!currentUser){
            console.log(currentUser)
            throw new AuthenticationError("not authenticated")
          }
          const exist = await Author.find({name: args.author}).countDocuments()
          let authorId 
          if (!exist){ //new author recognised
            const newAuthor = new Author({name: args.author, bookCount: 1})
            try{
              await newAuthor.save()
              authorId = newAuthor._id
            }catch(error){
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }
            
          }else{
            // named oldAuthors instead of oldAuthor since find returns a collection of author
            const oldAuthors = await Author.find({name: args.author}).select({"bookCount": 1, "_id": 1})
            // solve n+1 problem by creating bookCount as an attribute in the model and incrementing everytime a book belonging to that author is added,
            // preventing multiple queries!
            await Author.findOneAndUpdate({name: args.author}, {bookCount: Number(oldAuthors[0].bookCount)+1}, {new: true})
            authorId = oldAuthors[0]._id
          }
          
          const newBook = new Book({
            ...args,
            author: authorId
          })
          try{
            await newBook.save()
          }catch(error){
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
          
          const formattedBook = await Book.findOne({title: newBook.title}).populate('author')
          pubsub.publish('BOOK_ADDED',  {bookAdded: formattedBook})
          return formattedBook
      },

      editAuthor: async (root, args, {currentUser}) => {
          if (!currentUser){
            throw new AuthenticationError("not authenticated")
          }
          const updatedAuthor = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new: true})
          if (updatedAuthor===null){
            console.log('author does not exist')
          }
          return updatedAuthor
      },

      createUser: async (root, args) => {
        const newUser = new User({
          ...args
        })
        await newUser.save()
        return newUser
      },

      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
        if (!user || args.password!='asd'){
          throw new UserInputError("wrong credentials")
        }
        const userForToken = {
          username: args.username,
          id: user._id
        }

        return {value: jwt.sign(userForToken, JWT_SECRET)}
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.toLowerCase().startsWith("bearer ")){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url,  subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})