const validationResult = require('express-validator').validationResult
const { response, request } = require('express')

const inputValidate = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    })
  }
  next()
}

module.exports = inputValidate
