require('dotenv').config()

const passport = require('passport')
const User = require('../models/user.model')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

exports.getToken = function (user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: 3600 })
}

exports.jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    },
    (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    },
)

exports.verifyUser = passport.authenticate('jwt', { session: false })
