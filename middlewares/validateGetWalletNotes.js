const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const WalletUser = require('../models/walletUser')

const validateGetWalletNotes = async (req = request, res = response, next) => {
  let token = req.get('authorization')
  if (!(token && token.toLowerCase().startsWith('bearer '))) {
    res.status(401).json({ error: 'Missing or invalid authorization header' })
  }
  token = token.slice(7, token.length)

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

  const walletUser = await WalletUser.findById(decodedToken.id).populate('notes')

  if (!walletUser) {
    return res.status(401).json({ error: 'Wrong username or password' })
  }
  if (!walletUser.state) {
    return res.status(401).json({ error: 'User is not activated' })
  }

  req.walletUser = walletUser
  next()
}

module.exports = validateGetWalletNotes
