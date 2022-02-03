const { Router } = require('express')
const { check } = require('express-validator')
const { createWalletNote, getAllWalletNotes } = require('../controllers/walletNotes')
const validateGetWalletNotes = require('../middlewares/validateGetWalletNotes')
const { inputValidate } = require('../middlewares')

const router = Router()

router.get('/', [validateGetWalletNotes, inputValidate], getAllWalletNotes)

router.post('/', [
  validateGetWalletNotes,
  check('title').not().isEmpty(),
  check('content').not().isEmpty(),
  check('important').not().isEmpty().isBoolean(),
  inputValidate
], createWalletNote)

module.exports = router
