const { request, response } = require('express')
const Note = require('../models/note')
const User = require('../models/user')

const createNote = async (req = request, res = response) => {
  const { content, important = false, state = true, userId } = req.body
  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      message: 'User not found',
      user,
      userId
    })
  }
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    state,
    user: user._id
  })

  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
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
  const { state = true } = req.query

  const notes = await Note.find({ state })
  res.status(200).json(notes)
}

const getNoteById = async (req = request, res = response) => {
  const { id } = req.params

  const note = await Note.findById(id)
  res.status(200).json(note)
}

module.exports = {
  createNote,
  deleteNote,
  getNotes,
  getNoteById,
  updateNote
}
