const { Schema, model } = require('mongoose')

const WalletUserSchema = new Schema({

  account: {
    type: String,
    required: true
  },
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

WalletUserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const WalletUser = model('WalletUser', WalletUserSchema)

module.exports = WalletUser
