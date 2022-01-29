const { request, response } = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const validateGetNotes = async (req = request, res = response, next) => {
  const token = JSON.parse(req.get('authorization'))

  if (!token) {
    res.status(401).json({ error: 'Missing or invalid authorization header' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

  const user = await User.findById(decodedToken.id).populate('notes')
  !user && res.status(404).json({ msg: 'Username does not exist' })

  req.user = user
  next()
}

module.exports = validateGetNotes
