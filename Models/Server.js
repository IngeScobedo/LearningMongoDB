const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const cors = require('cors')
const dbConnection = require('../db/mongoConection')

class Server {
  constructor () {
    this.app = express()

    this.PORT = process.env.PORT
    this.paths = {
      notes: '/api/notes/',
      users: '/api/users/',
      login: '/api/login/',
      walletNotes: '/api/wallet/notes/',
      walletUsers: '/api/wallet/users',
      walletLogin: '/api/wallet/login/'
    }

    // dbConnection
    this.dbConnect()

    // Middleware
    this.middlewares()

    // Routes
    this.routes()
  }

  dbConnect () {
    dbConnection()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    Sentry.init({
      dsn: 'https://1e0fcdc754454b9db8b94deb7955f3ba@o1104612.ingest.sentry.io/6131928',
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.app })
      ],
      tracesSampleRate: 1.0
    })
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(Sentry.Handlers.requestHandler())
    this.app.use(Sentry.Handlers.tracingHandler())
    this.app.use(this.paths.notes, require('../routes/notes'))
    this.app.use(this.paths.users, require('../routes/users'))
    this.app.use(this.paths.login, require('../routes/login'))
    this.app.use(this.paths.walletNotes, require('../routes/walletNotes'))
    this.app.use(this.paths.walletUsers, require('../routes/walletUsers'))
    this.app.use(this.paths.walletLogin, require('../routes/walletLogin'))
    this.app.use(Sentry.Handlers.errorHandler())
  }

  listen () {
    this.server = this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`)
    })
  }
}

module.exports = Server
