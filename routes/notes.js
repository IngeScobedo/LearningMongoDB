const Router = require('express').Router()
const check = require('express-validator').check
const inputValidate = require('../middlewares/input-validate')
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
    check('content', 'Content is required').not().isEmpty(),
    check('userId', 'User is required').isMongoId(),
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
