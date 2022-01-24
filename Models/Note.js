const mongoose = require('mongoose')
const { Schema, model } = mongoose
const NoteSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  important: {
    type: Boolean,
    default: false,
    required: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

NoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', NoteSchema)

module.exports = Note
