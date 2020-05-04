const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        unique: true,
        required: true
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)