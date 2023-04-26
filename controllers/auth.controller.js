const passport = require('passport')
const authenticate = require('../middleware/auth.middleware')
const User = require('../models/auth/user.model')

const controller = {
    login: async function (req, res, next) {
        const accessToken = authenticate.getAccessToken({ _id: req.user._id })
        const refreshToken = authenticate.getRefreshToken({ _id: req.user._id })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({
            success: true,
            token: { accessToken: accessToken, refreshToken: refreshToken },
            status: 'You are successfully logged in!',
        })
    },

    register: async function (req, res, next) {
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
    },

    refresh: async function (req, res, next) {
        const accessToken = authenticate.getAccessToken({ _id: req.user._id })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({
            success: true,
            token: { accessToken: accessToken },
            status: 'You have successfully refreshed your JWT access token!',
        })
    },

    users: async function (req, res, next) {
        await User.find({})
            .then(
                (users) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json(users)
                },
                (err) => next(err),
            )
            .catch((err) => next(err))
    },
}

module.exports = controller
