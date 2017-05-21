const Vehicle = require('../models/vehicle')

async function save (req, res, next) {
  req.assert('placa', 'Placa é obrigatória').notEmpty()
  req.assert('marca', 'Marca é obrigatória').notEmpty()
  req.assert('modelo', 'Modelo é obrigatório').notEmpty()

  const validation = await req.getValidationResult()

  if (!validation.isEmpty()) {
    return res.status(400).json({
      errors: validation.array()
    })
  }

  // create object explicitly to avoid any unwanted field
  const vehicle = new Vehicle({
    placa: req.body.placa,
    imagem: req.body.image,
    marca: req.body.marca,
    modelo: req.body.modelo,
    combustivel: req.body.combustivel,
    valor: req.body.valor
  })

  try {
    const newVehicle = await vehicle.save()
    return res.json(newVehicle)
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400
    }
    return next(err)
  }
}

/**
 * Load a vehicle given its id
 */
async function findById (req, res, next) {
  const { vehicleId } = req.params
  const vehicle = await Vehicle.findById(vehicleId).exec()
  if (!vehicle) {
    const err = new Error('Vehicle not found')
    err.status = 404
    return next(err)
  }
  return res.json(vehicle)
}

/**
 * Get vehicles list
 */
async function findAll (req, res, next) {
  const { limit = 5, skip = 0 } = req.query
  try {
    const vehicles = await Vehicle.list({ limit, skip })
    return res.json({
      items: vehicles,
      total_count: vehicles.length
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  save,
  findById,
  findAll
}
