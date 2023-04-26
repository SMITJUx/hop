const express = require('express')
const router = express.router()
const authenticate = require('../../middleware/auth.middleware')
const controller = require('../../controllers/travels/travels.controller')

/* GET all travels related to the user. */
router.get('/', authenticate.verifyUserJwt, controller.getAll)
/* POST travel and compute its best fligts. */
router.post('/', authenticate.verifyUserJwt, controller.addOneWithBestFlights)
/* DELETE all travels related to the user. */
router.delete('/', authenticate.verifyUserJwt, controller.deleteAll)

/* GET one travel related to the user. */
router.get('/:id', authenticate.verifyUserJwt, controller.getOne)
/* DELETE one travel related to the user. */
router.delete('/:id', authenticate.verifyUserJwt, controller.deleteOne)

module.exports = router
