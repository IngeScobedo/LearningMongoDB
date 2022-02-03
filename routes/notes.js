const Router = require('express').Router()
const check = require('express-validator').check
const { inputValidate, validatorJWT, validateGetNotes } = require('../middlewares')
const {
  createNote,
  deleteNote,
  updateNote,
  getNotes,
  getNoteById
} = require('../controllers/notes')

const router = Router

router.get('/', [
  validateGetNotes
], getNotes)

router.get(
  '/:id',
  [
    validateGetNotes,
    check('id', 'Invalid ID').isMongoId(),
    inputValidate
  ],
  getNoteById
)

router.post(
  '/',
  [
    validatorJWT,
    check('content', 'Content is required').not().isEmpty().isString(),
    check('title', 'Title of note is required').not().isEmpty().isString(),
    check('important', 'Important is required').not().isEmpty().isBoolean(),
    inputValidate
  ],
  createNote
)

router.put(
  '/:id',
  [
    // TODO: add validator for ID
    check('id', 'Invalid ID').isMongoId(),
    // TODO: add validator for TITLE
    check('content', 'Content is required').not().isEmpty(),
    // TODO: add validator for IMPORTANT
    inputValidate
  ],
  updateNote
)

router.delete(
  '/:id',
  [check('id', 'Invalid ID').isMongoId(), inputValidate],
  deleteNote
)
module.exports = router
