const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/auth.controller')

router.post('/login', authenticate.verifyUserLocal, controller.login)
router.post('/register', controller.register)
router.get('/refresh', authenticate.verifyUserJwtRefresh, controller.refresh)

module.exports = router
