const passport = require('passport')
const authenticate = require('../middleware/auth.middleware')
const User = require('../models/user.model')

const controller = {
    login: function (req, res) {
        const token = authenticate.getToken({ _id: req.user._id })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ success: true, token: token, status: 'You are successfully logged in!' })
    },

    register: async function (req, res, next) {
        await User.register(
            new User({ username: req.body.username }),
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
                        res.json({ success: true, status: 'Registration Successful!' })
                    })
                }
            },
        )
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
