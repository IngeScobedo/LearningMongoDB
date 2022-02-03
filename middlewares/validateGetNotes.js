const { request, response } = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const validateGetNotes = async (req = request, res = response, next) => {
  let token = req.get('authorization')
  if (!(token && token.toLowerCase().startsWith('bearer '))) {
    res.status(401).json({ error: 'Missing or invalid authorization header' })
  }
  token = token.slice(7, token.length)
  if (!token || token === undefined) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  if (!decodedToken) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }

  const user = await User.findById(decodedToken.id).populate('notes')
  if (!user) {
    return res.status(404).json({
      msg: 'Username does not exist'
    })
  }

  req.user = user
  next()
}

module.exports = validateGetNotes
