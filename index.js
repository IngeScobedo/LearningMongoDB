const Server = require('./Models/Server')

const serverApi = new Server()

const server = serverApi.listen()

module.exports = { serverApi, server }
