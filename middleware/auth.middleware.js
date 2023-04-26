const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user.model')
const config = require('../config')

const { accessTokenPrivateKey, refreshTokenPrivateKey } = config.auth
const roles = config.roles

const jwtAccessTokenCookieExtractor = function (req) {
    let accessToken = null
    if (req && req.cookies) {
        accessToken = req.cookies['accessToken']
    }
    return accessToken
}
const jwtRefreshTokenCookieExtractor = function (req) {
    let refreshToken = null
    if (req && req.cookies) {
        refreshToken = req.cookies['refreshToken']
    }
    return refreshToken
}

exports.getAccessToken = function (user) {
    return jwt.sign(user, accessTokenPrivateKey, { expiresIn: '10m' })
}

exports.getRefreshToken = function (user) {
    return jwt.sign(user, refreshTokenPrivateKey, { expiresIn: '7d' })
}

exports.localStrategy = new LocalStrategy(User.authenticate())

exports.jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([jwtAccessTokenCookieExtractor]),
        secretOrKey: accessTokenPrivateKey,
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
        jwtFromRequest: ExtractJwt.fromExtractors([jwtRefreshTokenCookieExtractor]),
        secretOrKey: refreshTokenPrivateKey,
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

exports.jwtAdminStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([jwtAccessTokenCookieExtractor]),
        secretOrKey: accessTokenPrivateKey,
    },
    (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id, roles: roles.admin }, (err, user) => {
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
exports.verifyUserAdminJwt = passport.authenticate('jwt-admin', { session: false })
