require('dotenv').config()
require('./models/db')

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('./middleware/limit.middleware').rateLimit
const authRouter = require('./routes/auth.router')
const authenticate = require('./middleware/auth.middleware')
const User = require('./models/auth/user.model')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(rateLimit)
app.use(passport.initialize())

passport.use(authenticate.localStrategy)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(authenticate.jwtStrategy)
passport.use('jwt-refresh', authenticate.jwtRefreshStrategy)

app.use('/auth', authRouter)
app.get('/', (req, res) => {
    res.send('Hello world')
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
})

module.exports = app
