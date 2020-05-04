const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
    required: true
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Author', schema)