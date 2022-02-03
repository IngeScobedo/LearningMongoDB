const { request, response } = require('express')
const Note = require('../models/Note')

const createNote = async (req = request, res = response) => {
  const { title, content, important, state = true } = req.body
  const { user } = req

  console.log(user)

  const note = new Note({ title, content, important, state, userId: user.id })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json({ savedNote })
}

const deleteNote = async (req = request, res = response) => {
  const { id } = req.params
  const note = await Note.findByIdAndUpdate(id, { state: false }, { new: true })
  res.status(200).json({
    message: 'Note deleted successfully',
    note
  })
}

const updateNote = async (req = request, res = response) => {
  const { id } = req.params
  const { content, important } = req.body
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true }
  )
  res.status(200).json({ updatedNote })
}

const getNotes = async (req, res) => {
  const { notes } = req.user

  res.status(200).json(notes)
}

const getNoteById = async (req = request, res = response) => {
  const { user } = req
  const { notes } = user
  const { id } = req.params

  const note = notes.find(note => note.id === id)
  res.status(200).json(note)
}

module.exports = {
  createNote,
  deleteNote,
  getNotes,
  getNoteById,
  updateNote
}
