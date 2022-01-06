const { request, response } = require('express')
const Note = require('../models/note')

const createNote = (req = request, res = response) => {
  const { content, important = false, state = true } = req.body

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    state
  })
  newNote
    .save()
    .then((savedNote) => {
      res.status(200).json(savedNote)
    })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
}

const deleteNote = async (req = request, res = response) => {
  const { id } = req.params
  const note = await Note.findByIdAndUpdate(id, { state: false }, { new: true })
  if (!note) {
    return res.status(404).json({
      message: 'Note not found'
    })
  }
  res.status(200).json({
    message: 'Note deleted successfully',
    note
  })
}

const updateNote = async (req = request, res = response) => {
  const { id } = req.params
  const { content, important } = req.body

  const note = await Note.findById(id)

  if (!note) return res.status(404).json({ message: 'Note not found' })

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true }
  )
  res.json(updatedNote)
}

const getNotes = (req, res) => {
  const { state = true } = req.query
  Note.find({ state })
    .then((notes) => {
      res.status(200).json(notes)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

const getNoteById = (req = request, res = response) => {
  const { id } = req.params
  Note.findById(id)
    .then((note) => {
      res.json(note)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports = {
  createNote,
  deleteNote,
  getNotes,
  getNoteById,
  updateNote
}
