const User = require('../models/user')

const getUserById = async (id) => {
  const user = await User.findById(id)
  if (user) {
    return user
  } else {
    return null
  }
}
module.exports = getUserById
