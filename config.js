require('dotenv').config()

const env = process.env.NODE_ENV || 'dev'

const dev = {
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db',
        user: process.env.DEV_DB_USER || '',
        password: process.env.DEV_DB_PASSWORD || ''
    },
    auth: {
        accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
        refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || '',
    },
    api: {
        key: process.env.DEV_API_KEY || ''
    }
}

const config = {
    dev,
}

module.exports = {
    env: env,
    params: config[env],
}
