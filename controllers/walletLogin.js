const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const WalletUser = require('../models/walletUser')

const loginWalletUser = async (req = request, res = response) => {
  const { account } = req.body

  const walletUser = await WalletUser.findOne({ account })

  if (!walletUser) {
    const newUser = new WalletUser({
      account
    })
    const userSaved = await newUser.save()

    const userForToken = {
      id: userSaved._id,
      username: userSaved.account
    }

    const token = jwt.sign(userForToken, process.env.SECRET_KEY)

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      token
    })
  } else {
    const userForToken = {
      id: walletUser._id,
      username: walletUser.account
    }

    const token = jwt.sign(userForToken, process.env.SECRET_KEY)

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      token
    })
  }
}

module.exports = { loginWalletUser }
