const passport = require('passport')
const validationResult = require('express-validator').validationResult
const authenticate = require('../middleware/auth.middleware')
const User = require('../models/user.model')
const RefreshToken = require('../models/refreshToken.model')
const config = require('../config')

const controller = {
    login: async function (req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                })
            }

            if (req.user.revoked) {
                res.status(401).json({
                    success: false,
                    message: 'This account is banned!',
                })
                return
            }

            const accessToken = authenticate.getAccessToken({ _id: req.user._id })
            const refreshToken = authenticate.getRefreshToken({ _id: req.user._id })

            const token = new RefreshToken({ userId: req.user.id, value: refreshToken })
            await token.save()

            res.statusCode = 200
            res.cookie('accessToken', accessToken, config.cookies)
            res.cookie('refreshToken', refreshToken, config.cookies)
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
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                })
            }
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
            let refreshToken = authenticate.jwtRefreshTokenCookieExtractor(req)
            let token = await RefreshToken.findOne({ userId: req.user.id, value: refreshToken })

            if (token && token.revoked) {
                const user = await User.findOne({ _id: req.user.id })
                if (user) {
                    user.revoked = Date.now()
                    await user.save()
                }
                res.status(401).json({
                    success: false,
                    message:
                        "You are using a used JWT token, it's suspicious, your account is banned.",
                })
                return
            }

            if (token && !token.revoked) {
                token.revoked = Date.now()
                await token.save()
            }

            const accessToken = authenticate.getAccessToken({ _id: req.user._id })
            refreshToken = authenticate.getRefreshToken({ _id: req.user._id })

            token = new RefreshToken({ userId: req.user.id, value: refreshToken })
            await token.save()

            res.statusCode = 200
            res.cookie('accessToken', accessToken, config.cookies)
            res.cookie('refreshToken', refreshToken, config.cookies)
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                status: 'You have successfully refreshed your JWT access token!',
            })
        } catch (err) {
            next(err)
        }
    },

    revoke: async (req, res, next) => {
        try {
            let refreshToken = authenticate.jwtRefreshTokenCookieExtractor(req)
            let token = await RefreshToken.findOne({ userId: req.user.id, value: refreshToken })

            if (token && token.revoked) {
                const user = await User.findOne({ _id: req.user.id })
                if (user) {
                    user.revoked = Date.now()
                    await user.save()
                }
                res.status(401).json({
                    success: false,
                    message:
                        "You are using a used JWT token, it's suspicious, your account is banned.",
                })
                return
            }

            if (token && !token.revoked) {
                token.revoked = Date.now()
                await token.save()
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                status: 'You have successfully been logout on the server side!',
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
