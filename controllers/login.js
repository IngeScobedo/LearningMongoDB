const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const login = async (req = request, res = response) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  console.log(user)
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Wrong username or password' })
  }
  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET_KEY)
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    token
  })
}

module.exports = { login }
