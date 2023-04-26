require('dotenv').config()

const config = {}

config.env = process.env.NODE_ENV || 'dev'

config.db = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'db',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
}

config.auth = {
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || '',
}

config.api = {
    baseUrl: process.env.BASE_URL || '',
    key: process.env.API_KEY || '',
}

config.limit = {
    windowMs: 15 * 60 * 1000, // 15 minutes,
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
}

config.roles = {
    customer: 'CUSTOMER',
    staff: 'STAFF',
    admin: 'ADMIN',
}

config.whitelist = ['https://wwww.hophop.world', 'http://localhost:3000']
config.corsOptions = {
    origin: function (origin, callback) {
        if (!origin || config.whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS.'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
}

module.exports = config
