const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
	console.log('give password as argument')
	process.exit(1)
}
else if (3<process.argv.length && process.argv.length<5){
	console.log('give both name and number')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://gyip002:${password}@cluster0-0tury.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number
})

const Person = mongoose.model('Person', personSchema)

const people = new Person(
	{
		name: `${name}`,
		number: `${number}`
	}
)

/* eslint-disable no-unused-vars */

if (name && number){
	people.save().then(response => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
}

/* eslint-enable no-unused-vars */

else{
	console.log('phonebook:')
	Person.find({}).then(persons => {
		persons.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}
