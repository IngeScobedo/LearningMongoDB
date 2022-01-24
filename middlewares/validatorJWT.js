const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const validatorJWT = async (req = request, res = response, next) => {
  let token = req.get('authorization')
  if (!(token && token.toLowerCase().startsWith('bearer '))) {
    res.status(401).json({ error: 'Missing or invalid authorization header' })
  }
  token = token.slice(7, token.length)
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const user = await User.findById(decodedToken.id)

  try {
    if (!user) {
      return res.status(404).json({
        msg: 'Username does not exist'
      })
    }

    if (!user.state) {
      return res
        .status(401)
        .json({ msg: `RESTRICTED method for user ${user.name}` })
    }

    req.user = user

    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      msg: 'Petition with invalid token'
    })
  }
}

module.exports = validatorJWT
