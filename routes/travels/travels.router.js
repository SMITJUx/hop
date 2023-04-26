const express = require('express')
const router = express.router()
const authenticate = require('../../middleware/auth.middleware')
const controller = require('../../controllers/travels/travels.controller')

/* GET all travels related to the user. */
router.get('/', authenticate.verifyUserJwt, controller.getAll)
/* POST to add a new travel for a user.*/
router.post('/', authenticate.verifyUserJwt, controller.addOne)
/* DELETE all travels related to the user. */
router.delete('/', authenticate.verifyUserJwt, controller.deleteAll)

/* GET one travel related to the user. */
router.get('/:id', authenticate.verifyUserJwt, controller.getOne)
/* DELETE one travel related to the user. */
router.delete('/:id', authenticate.verifyUserJwt, controller.deleteOne)
/* GET best flights for a travel. */
router.get('/best-flights/:id', authenticate.verifyUserJwt, controller.bestFlights)

module.exports = router
