const express = require('express')
const usersRoutes = require('./users')
const authRoutes = require('./auth')
const vehiclesRoutes = require('./vehicles')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/', (req, res) =>
  res.send('API is running')
)

// mount user routes at /users
router.use('/users', usersRoutes)

// mount auth routes at /auth
router.use('/auth', authRoutes)

// mount project routes at /projects
router.use('/vehicles', vehiclesRoutes)

module.exports = router
