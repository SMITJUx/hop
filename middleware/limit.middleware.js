const rateLimit = require('express-rate-limit')
const rateLimitConfig = require('../config').rateLimit

exports.rateLimit = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    standardHeaders: rateLimitConfig.standardHeaders,
    legacyHeaders: rateLimitConfig.legacyHeaders,
})
