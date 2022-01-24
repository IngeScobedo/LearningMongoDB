const User = require('../models/user')

const isValidUsername = async (username) => {
  const user = await User.findOne({ username })
  console.log(user)
  if (user) throw new Error('username is not unique')
}

const isValidEmail = async (email) => {
  const user = await User.findOne({ email })
  console.log(user)
  if (user) throw new Error('email is not unique')
}

module.exports = { isValidUsername, isValidEmail }
