const Project = require('../models/project')

function save (req, res, next) {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    backgroundColor: req.body.backgroundColor,
    ownerId: req.user.id
  })

  project.save((err, project) => {
    if (err) {
      if (err.name === 'ValidationError') {
        err.status = 400
      }

      return next(err)
    }

    return res.json(project)
  })
}

/**
 * Load a project given its id and user id
 */
function findById (req, res, next) {
  Project.get(req.param.id, req.user.id)
    .then(project => res.json(project))
    .catch(e => next(e))
}

/**
 * Get a list of projects of the user logged in
 */
function findByOwnerId (req, res, next) {
  Project.findByOwnerId(req.user.id)
    .then(projects => res.json(projects))
    .catch(e => next(e))
}

module.exports = { save, findById, findByOwnerId }