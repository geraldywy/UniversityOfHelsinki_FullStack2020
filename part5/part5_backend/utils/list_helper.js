const _ =  require('lodash')



const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) =>  {
    const reducer = (accumulator, i) => accumulator+i;
    return(
        blogs.map(blog=>blog.likes).reduce(reducer)
    )
}

const favoriteBlog = (blogs)=>{
  var highest = 0
  var result = null
  blogs.forEach(blog=>{
    if (blog.likes>highest){
      result = blog
      highest = blog.likes
    }
  })
  return result
}

const mostBlogs = (blogs) =>{
  const authors_post = _.countBy(blogs, 'author')
  if(Object.keys(authors_post).length===0){
    return null
  }
  return Object.keys(authors_post).reduce((a, b)=>
    authors_post[a]> authors_post[b] ? a: b
  )
}

const mostLikes = (blogs) =>{
  const hashmap = {}
  blogs.map(blog=>{
    if (blog.author in hashmap){
      hashmap[blog.author] += blog.likes
    }
    else{
      hashmap[blog.author] = blog.likes
    }
  })
  if (Object.keys(hashmap).length===0){
    return null
  }
  const fav_author = Object.keys(hashmap).reduce((a, b)=>hashmap[a] > hashmap[b] ? a: b)
  return {"author": fav_author, "likes": hashmap[fav_author]}
}

module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog, 
    mostBlogs,
    mostLikes
  }