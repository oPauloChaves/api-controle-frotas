const express = require('express')
// const expressJwt = require('express-jwt')
const vehiclesCtrl = require('../controllers/vehicles')

const router = express.Router()
// const secret = process.env.JWT_SECRET

router.route('/')
  /** GET /api/vehicles - Get a list of vehicles */
  .get(/* expressJwt({ secret }), */ vehiclesCtrl.findAll)
  /** POST /api/vehicles - Create a new vehicle */
  .post(/* expressJwt({ secret }), */ vehiclesCtrl.save)

router.route('/:vehicleId')
  /** GET /api/vehicles/:vehicleId - Get a vehicle */
  .get(/* expressJwt({ secret }), */ vehiclesCtrl.findById)

module.exports = router
