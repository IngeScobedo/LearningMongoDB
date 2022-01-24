const User = require('../models/User')

const isValidUsername = async (username) => {
  const user = await User.findOne({ username })
  if (user) throw new Error('username is not unique')
}

const isValidEmail = async (email) => {
  const user = await User.findOne({ email })
  if (user) throw new Error('email is not unique')
}

module.exports = { isValidUsername, isValidEmail }
