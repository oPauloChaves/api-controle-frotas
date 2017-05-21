const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')

const isDev = process.env.NODE_ENV === 'development'

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
if (isDev) {
  dotenv.load()
}

/**
 * Create Express server.
 */
const app = express()

if (isDev) {
  app.use(logger('dev'))
}

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise
let mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/controle_frotas'
mongoose.connect(mongoUri, {
  server: { socketOptions: { keepAlive: 1 } }
})
mongoose.connection.on('error', () => {
  throw new Error(`MongoDB connection error. Please make sure MongoDB is running.`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

app.use(cors())

// mount all routes on /api path
app.use('/api', require('./routes'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (isDev) {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message,
      error: {}
    }
  })
})

module.exports = app
