const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/auth.middleware')
const controller = require('../../controllers/auth/auth.controller')

router.get('/', authenticate.verifyUserLocal, controller.login)
router.post('/', controller.register)
router.get('/refresh', authenticate.verifyUserJwtRefresh, controller.refresh)

module.exports = router
