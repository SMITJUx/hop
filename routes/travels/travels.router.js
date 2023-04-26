const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/auth.middleware')
const controller = require('../../controllers/travels/travels.controller')

router.get('/', authenticate.verifyUserJwt, controller.getAll)
router.post('/', authenticate.verifyUserJwt, controller.addOne)
router.delete('/', authenticate.verifyUserJwt, controller.deleteAll)

router.get('/:id', authenticate.verifyUserJwt, controller.getOne)
router.delete('/:id', authenticate.verifyUserJwt, controller.deleteOne)
router.get('/best-flights/:id', authenticate.verifyUserJwt, controller.getBestFlights)

module.exports = router
