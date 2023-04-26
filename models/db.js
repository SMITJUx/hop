const mongoose = require('mongoose')

const url = 'mongodb://mongo:27017/hop'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.set('strictQuery', true)
mongoose.connect(url, options)

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
