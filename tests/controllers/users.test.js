const mongoose = require('mongoose')
const User = require('../../Models/User')
const { api, initialUsers, server } = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.save()
  }
})

describe('GET /api/users', () => {
  test('should return users and return 200 OK', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('should return 2 users', async () => {
    const response = await api.get('/api/users')
    expect(response.body.users.length).toBe(initialUsers.length)
  })
})

describe('POST /api/users', () => {
  test('should create a new user', async () => {
    const newUser = {
      username: 'NewTestUser',
      name: 'Test User',
      email: 'newtest@testing.com',
      password: 'testpassword'
    }
    await api.post('/api/users').send(newUser).expect(201)
  })
  test('should return 400 if username is not unique', async () => {
    const userDuplicated = initialUsers[0]
    await api
      .post('/api/users')
      .send(userDuplicated)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
