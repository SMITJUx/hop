const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/auth.middleware')
const controller = require('../../controllers/auth/auth.controller')

/* POST to register a user. */
router.post('/', controller.register)

/* GET to login a user. */
router.get('/', authenticate.verifyUserLocal, controller.login)

/* GET refresh JWT tokens. */
router.get('/refresh', authenticate.verifyUserJwtRefresh, controller.refresh)

module.exports = router
