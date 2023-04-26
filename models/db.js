const mongoose = require('mongoose')
const config = require('../config')

const { db: { host, port, name, user, password } } = config.db

mongoose.set('strictQuery', true)
mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connecting', () => {
    console.log('Connecting')
})

mongoose.connection.on('error', () => {
    console.log('Connection error')
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database successfully established')
})

mongoose.connection.on('diconnected', () => {
    console.log('Disconnected')
})

mongoose.connection.on('reconnected', () => {
    console.log('Reconnected')
})

module.exports = mongoose.connection
