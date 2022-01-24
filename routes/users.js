const Router = require('express').Router()
const check = require('express-validator').check
const inputValidate = require('../middlewares/input-validate')

const { isValidUsername, isValidEmail } = require('../helpers/db-validators')

const router = Router

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

router.get('/', getAllUsers)
router.get('/:id', getUserById)

router.post(
  '/',
  [
    check('username', 'username is required')
      .isString()
      .isLength({ min: 3 })
      .custom(isValidUsername),
    check('name', 'name is required and with a minimum length of 3 characters')
      .isString()
      .isLength({ min: 3 }),
    check('email', 'email is required').isEmail().custom(isValidEmail),
    check(
      'password',
      'password is required and with a minimum length of 3 characters'
    )
      .isString()
      .isLength({ min: 3 }),
    inputValidate
  ],
  createUser
)

module.exports = router
