const { request, response } = require('express')
const WalletUser = require('../models/walletUser')

const getAllWalletUsers = async (req = request, res = response) => {
  const walletUsers = await WalletUser.find({})
    .populate('notes')

  res.status(200).json({ walletUsers })
}

const createWalletUser = async (req = request, res = response) => {
  const { account } = req.body

  const walletUser = new WalletUser({
    account
  })

  await walletUser.save()

  res.status(200).json({ walletUser })
}

module.exports = { getAllWalletUsers, createWalletUser }
