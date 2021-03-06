const { Router } = require('express')
const { check } = require('express-validator')

const {
  getAllWalletUsers,
  createWalletUser
} = require('../controllers/walletUsers')
const { inputValidate } = require('../middlewares')

const router = Router()

router.get('/', getAllWalletUsers)

router.post('/', [
  check('account').not().isEmpty(),
  inputValidate
], createWalletUser)

module.exports = router
