require('dotenv').config()
const mongoose = require('mongoose')

const mongoUri =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_CNN_DEV
    : process.env.MONGO_CNN_PROD

const dbConnection = () => {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('connected to db')
    })
    .catch((error) => {
      console.log('error', error)
    })
}

module.exports = dbConnection
