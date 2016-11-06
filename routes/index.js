const express = require('express')
const userRoutes = require('./users')
const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

// mount user routes at /users
router.use('/users', userRoutes)

module.exports = router