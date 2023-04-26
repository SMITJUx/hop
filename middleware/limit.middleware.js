const rateLimit = require('express-rate-limit')
const config = require('../config')

const limitConfig = config.limit

exports.rateLimit = rateLimit({
    windowMs: limitConfig.windowMs,
    max: limitConfig.max,
    standardHeaders: limitConfig.standardHeaders,
    legacyHeaders: limitConfig.legacyHeaders
})
