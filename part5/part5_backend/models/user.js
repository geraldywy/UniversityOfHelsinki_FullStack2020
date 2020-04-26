/*
 defining the user schema:
    users should have
        1. username
        2. password
        3. name
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.passwordHash
        delete returnedObject.__v
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)