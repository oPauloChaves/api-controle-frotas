const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Project = require('../models/project')

function get (req, res) {
  return res.json(req.user)
}

function save (req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  User.emailExists(user.email)
    .then((exists) => {
      if (exists) {
        let error = new Error('Account with that email address already exists.')
        error.status = 422
        return next(error)
      }

      return user.save()
        .then(user => {
          // Create a default project for this new user
          new Project({
            name: 'Sample Project',
            description: 'Enjoy Reskongoal Project Management',
            ownerId: user._id
          }).save()

          const token = jwt.sign({
            id: user._id,
            email: user.email
          }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          })

          return res.json({
            token,
            email: user.email
          })
        })
        .catch(err => {
          if (err.name === 'ValidationError') {
            err.status = 400
          }
          return next(err)
        })
    })
    .catch(e => next(e))
}

/**
 * Load an user given his ID and append him to the request
 */
function findById (req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get user list
 */
function findAll (req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e))
}

module.exports = { findById, get, findAll, save }
