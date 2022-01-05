const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  state: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = noteSchema
