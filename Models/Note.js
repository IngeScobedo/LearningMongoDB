const mongoose = require('mongoose')
const noteSchema = require('../Schemas/noteSchema')
const { model } = mongoose

const Note = model('Note', noteSchema)

module.exports = Note
