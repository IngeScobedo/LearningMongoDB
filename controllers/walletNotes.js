const { request, response } = require('express')
const Note = require('../models/Note')

const createWalletNote = async (req = request, res = response) => {
  const { title, content, important } = req.body

  const user = req.walletUser

  const walletNote = new Note({
    title,
    content,
    important,
    user: user.id
  })

  const noteSaved = await walletNote.save()
  user.notes = user.notes.concat(noteSaved._id)
  await user.save()
  res.status(200).json({ message: noteSaved })
}

const getAllWalletNotes = async (req = request, res = response) => {
  const walletUser = req.walletUser
  console.log(walletUser)

  if (!walletUser) {
    return res.status(401).json({ error: 'Wrong username or password' })
  }
  const { notes } = walletUser

  res.status(200).json(notes)
}

module.exports = {
  createWalletNote,
  getAllWalletNotes
}
