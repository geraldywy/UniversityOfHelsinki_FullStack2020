const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator  =  require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(console.log('connected to MONGODB')
	).catch(
		error => {
			console.log('error connecting to MONGODB:', error.message)
		}
	)

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	number: {
		type: String,
		minlength: 8,
		required: true,
		unique: true
	},
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)