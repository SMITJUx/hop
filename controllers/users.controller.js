const User = require('../models/user.model')

const controller = {
    getMe: async function (req, res, next) {
        try {
            const me = req.user
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                data: me,
            })
        } catch (err) {
            next(err)
        }
    },

    getUser: async function (req, res, next) {
        try {
            const user = await User.find({ username: req.params.username })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                data: user,
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
