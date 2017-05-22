const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { COMBUSTIVEIS } = require('./constants')

const VehicleSchema = new Schema({
  placa: {
    type: String,
    required: true,
    unique: true
  },
  imagem: {
    type: String
  },
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  combustivel: {
    type: String,
    enum: COMBUSTIVEIS,
    default: COMBUSTIVEIS[1]
  },
  valor: {
    type: Schema.Types.Number,
    default: 0.0
  }
}, {
  timestamps: true
})

VehicleSchema.path('placa').index({
  unique: true
})

/**
 * Finds a vehicle by its placa
 *
 * @return Promise
 */
VehicleSchema.statics.findByPlaca = function (placa) {
  return this.findOne({ placa }).exec()
}

/**
 * Gets a list of vehicles paginated
 *
 * @return Promise
 */
VehicleSchema.statics.list = function ({ skip = 0, limit = 5 } = {}) {
  return this.find({})
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .exec()
}

module.exports = mongoose.model('Vehicle', VehicleSchema)
