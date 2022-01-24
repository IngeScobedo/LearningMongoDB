const mongoose = require('mongoose')
const Note = require('../../Models/Note')
const User = require('../../models/user')
const {
  api,
  server,
  initialNotes,
  falseNotes,
  getAllContentsFromNotes,
  postFalseNotes
} = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})
  await User.deleteMany({})

  for (const note of initialNotes) {
    const newNote = new Note(note)
    await newNote.save()
  }
})

describe('GET /api/notes', () => {
  test('are returned json & 200 OK', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 2 notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body.length).toBe(initialNotes.length)
  })
  test('there are 2 notes with false state', async () => {
    await postFalseNotes()
    const response = await api.get('/api/notes?state=false')
    expect(response.body.length).toBe(falseNotes.length)
  })
  test('get note by id', async () => {
    const initialNote = initialNotes[0]
    const { notes } = await getAllContentsFromNotes()
    const response = await api.get(`/api/notes/${notes.body[0].id}`)
    expect(response.body.content).toEqual(initialNote.content)
  })
})

describe('POST /api/notes', () => {
  test('a valid note can be added', async () => {
    const testUser = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: 'test'
    }

    const userSaved = await api.post('/api/users').send(testUser)

    const loginData = await api.post('/api/login').send({
      username: userSaved.body.userSaved.username,
      password: testUser.password
    })
    const newNote = {
      content: 'Testin new note',
      important: true,
      userId: userSaved.body.userSaved.id
    }
    await api
      .post('/api/notes')
      .set('authorization', `bearer ${loginData.body.token}`)
      .send(newNote)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(201)
    const { contents, notes } = await getAllContentsFromNotes()
    expect(contents).toContain(newNote.content)
    expect(notes.body.length).toBe(initialNotes.length + 1)
  })

  test('a note without content is not added', async () => {
    const testUser = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: 'test'
    }

    const userSaved = await api.post('/api/users').send(testUser)

    const loginData = await api.post('/api/login').send({
      username: userSaved.body.userSaved.username,
      password: testUser.password
    })
    const newNote = {
      important: true,
      userId: userSaved.body.userSaved.id
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Accept', 'application/json')
      .set('authorization', `bearer ${loginData.body.token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const notes = await api.get('/api/notes')
    expect(notes.body.length).toBe(initialNotes.length)
  })
})

describe('PUT /api/notes/', () => {
  test('a valid note can be updated', async () => {
    const newNote = {
      content: 'update first Note',
      important: true,
      date: new Date(),
      state: true
    }
    const { notes } = await getAllContentsFromNotes()
    const note = notes.body[0]
    await api
      .put(`/api/notes/${note.id}`)
      .send(newNote)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
    const { contents } = await getAllContentsFromNotes()
    expect(contents).toContain(newNote.content)
  })
  test('a note without content is not updated', async () => {
    const newNote = {
      important: true,
      date: new Date(),
      state: true
    }
    const { notes, contents: contentsAtStart } = await getAllContentsFromNotes()
    const note = notes.body[0]
    await api
      .put(`/api/notes/${note.id}`)
      .send(newNote)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { contents: contentsAtEnd } = await getAllContentsFromNotes()
    expect(contentsAtStart).toEqual(contentsAtEnd)
  })
  test('a note with invalid id is not updated', async () => {
    const newNote = {
      content: 'update first Note',
      important: true,
      date: new Date(),
      state: true
    }
    await api
      .put('/api/notes/123')
      .send(newNote)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(400)
    const { contents } = await getAllContentsFromNotes()
    expect(contents).not.toContain(newNote.content)
  })
})

describe('DELETE /api/notes/', () => {
  test('a valid note can be deleted', async () => {
    const { notes } = await getAllContentsFromNotes()
    const note = notes.body[0]
    await api
      .delete(`/api/notes/${note.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
    const { contents } = await getAllContentsFromNotes()
    expect(contents).not.toContain(note.content)
  })
  test('a note with invalid id is not deleted', async () => {
    await api
      .delete('/api/notes/123')
      .expect('Content-Type', /application\/json/)
      .expect(400)
    const { contents } = await getAllContentsFromNotes()
    expect(contents.lenght).toBe(initialNotes.lenght)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
