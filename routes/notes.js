const Router = require('express').Router()
const check = require('express-validator').check
const { inputValidate, validatorJWT } = require('../middlewares')
const {
  createNote,
  deleteNote,
  updateNote,
  getNotes,
  getNoteById
} = require('../controllers/notes')

const router = Router

router.get('/', getNotes)
router.get(
  '/:id',
  [check('id', 'Invalid ID').isMongoId(), inputValidate],
  getNoteById
)

router.post(
  '/',
  [
    validatorJWT,
    check('content', 'Content is required').not().isEmpty(),
    inputValidate
  ],
  createNote
)

router.put(
  '/:id',
  [
    check('id', 'Invalid ID').isMongoId(),
    check('content', 'Content is required').not().isEmpty(),
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
