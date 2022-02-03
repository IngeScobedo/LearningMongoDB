const { Router } = require('express')
const { check } = require('express-validator')

const {
  loginWalletUser
} = require('../controllers/walletLogin')
const { inputValidate } = require('../middlewares')

const router = Router()

router.post('/', [
  check('account').not().isEmpty(),
  inputValidate
], loginWalletUser)

module.exports = router
