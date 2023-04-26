const express = require('express')
const router = express.Router()
const passport = require('passport')
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/auth.controller')

/* POST sign up. */
router.post('/register', controller.register)

/* POST sign in. */
router.post('/login', passport.authenticate('local', { session: false }), controller.login)

/* GET list of users. */
router.get('/list', authenticate.verifyUser, controller.users)

module.exports = router
