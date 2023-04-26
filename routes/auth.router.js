const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/auth.controller')

/* POST register. */
router.post('/register', controller.register)

/* POST login. */
router.post('/login', authenticate.verifyUserLocal, controller.login)

/* POST refresh JWT tokens. */
router.post('/refresh', authenticate.verifyUserJwtRefresh, controller.refresh)

/* GET list of users. */
router.get('/list', authenticate.verifyUserJwt, controller.users)

module.exports = router
