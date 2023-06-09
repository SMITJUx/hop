require('./models/db')

const createError = require('http-errors')
const express = require('express')
const favicon = require('express-favicon')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const rateLimit = require('express-rate-limit')
const authRouter = require('./routes/auth.router')
const usersRouter = require('./routes/users.router')
const travelsRouter = require('./routes/travels.router')
const authenticate = require('./middleware/auth.middleware')
const User = require('./models/user.model')
const config = require('./config')

const app = express()

app.use(favicon(__dirname + '/public/favicon.png'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(config.corsOptions))
app.use(helmet(config.helmetOptions))
app.use(rateLimit(config.rateLimit))
app.use(passport.initialize())

passport.use(authenticate.localStrategy)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(authenticate.jwtStrategy)
passport.use('jwt-refresh', authenticate.jwtRefreshStrategy)
passport.use('jwt-admin', authenticate.jwtAdminStrategy)

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/travels', travelsRouter)
app.use(
    ['/api/docs', '/api', '/'],
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(config.swagger), {
        explorer: false,
        customSiteTitle: 'hop',
        customfavIcon: __dirname + '/public/favicon.png',
    }),
)

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
    res.status(err.status || 500).send({ err })
})

module.exports = app
