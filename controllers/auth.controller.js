const passport = require('passport')
const authenticate = require('../middleware/auth.middleware')
const User = require('../models/user.model')
const config = require('../config')

const controller = {
    login: async function (req, res, next) {
        try {
            const accessToken = authenticate.getAccessToken({ _id: req.user._id })
            const refreshToken = authenticate.getRefreshToken({ _id: req.user._id })

            res.statusCode = 200
            res.cookie('accessToken', accessToken, {
                secure: config.env !== 'dev',
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 604800000, // 7 days
            })
            res.cookie('refreshToken', refreshToken, {
                secure: config.env !== 'dev',
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 604800000, // 7 days
            })
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                status: 'You are successfully logged in!',
            })
        } catch (err) {
            next(err)
        }
    },

    register: async function (req, res, next) {
        try {
            await User.register(
                new User({ username: req.body.username, email: req.body.email }),
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.setHeader('Content-Type', 'application/json')
                        res.json({ err: err })
                    } else {
                        passport.authenticate('local')(req, res, () => {
                            res.statusCode = 200
                            res.setHeader('Content-Type', 'application/json')
                            res.json({ success: true, status: 'Registration successful!' })
                        })
                    }
                },
            )
        } catch (err) {
            next(err)
        }
    },

    refresh: async function (req, res, next) {
        try {
            const accessToken = authenticate.getAccessToken({ _id: req.user._id })

            res.statusCode = 200
            res.cookie('accessToken', accessToken, {
                secure: config.env !== 'dev',
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 604800000, // 7 days
            })
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                status: 'You have successfully refreshed your JWT access token!',
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
