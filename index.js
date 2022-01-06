const Server = require('./Models/Server')

const serverApi = new Server()

serverApi.listen()

module.exports = { serverApi }
