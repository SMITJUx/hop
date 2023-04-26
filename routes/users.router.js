const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/users.controller')

router.get('/me', authenticate.verifyUserJwt, controller.getMe)
router.get('/:id', authenticate.verifyUserAdminJwt, controller.getUser)

module.exports = router
