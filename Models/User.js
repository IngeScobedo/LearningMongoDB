const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: String,
  state: {
    type: Boolean,
    default: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', UserSchema)

module.exports = User
