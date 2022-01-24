const supertest = require('supertest')
const Note = require('../../Models/Note')

const { serverApi } = require('../../index')

const { app, server } = serverApi

const api = supertest(app)

const initialUsers = [
  {
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword'
  },
  {
    name: 'Test User2',
    email: 'test2@example.com',
    username: 'testuser2',
    password: 'testpassword2'
  }
]

const falseUsers = [
  { name: 'Fake User', username: 'fakeuser', password: 'fakepassword' },
  { name: 'Fake User2', username: 'fakeuser2', password: 'fakepassword2' }
]

const initialNotes = [
  {
    content: 'First note youuu',
    important: true,
    date: new Date(),
    state: true
  },
  {
    content: 'Second note fuuuuuck',
    important: false,
    date: new Date(),
    state: true
  }
]

const falseNotes = [
  {
    content: 'First note youuu',
    important: true,
    date: new Date(),
    state: false
  },
  {
    content: 'Second note fuuuuuck',
    important: false,
    date: new Date(),
    state: false
  }
]

const postFalseNotes = async () => {
  await Note.deleteMany({})
  for (const note of falseNotes) {
    const falseNote = new Note(note)
    await falseNote.save()
  }
}

const getAllContentsFromNotes = async () => {
  const notes = await api.get('/api/notes/')
  return {
    contents: notes.body.map((note) => note.content),
    notes
  }
}

module.exports = {
  api,
  server,
  initialNotes,
  falseNotes,
  getAllContentsFromNotes,
  postFalseNotes,
  initialUsers,
  falseUsers
}
