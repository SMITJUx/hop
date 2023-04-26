require('dotenv').config()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/auth/user.model')

exports.getAccessToken = function (user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '10m' })
}

exports.getRefreshToken = function (user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '7d' })
}

exports.localStrategy = new LocalStrategy(User.authenticate())

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

exports.jwtRefreshStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
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

exports.verifyUserLocal = passport.authenticate('local', { session: false })
exports.verifyUserJwt = passport.authenticate('jwt', { session: false })
exports.verifyUserJwtRefresh = passport.authenticate('jwt-refresh', { session: false })
