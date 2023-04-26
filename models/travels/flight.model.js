const mongoose = require('mongoose')

const FlightSchema = new mongoose.Schema(
    {
        

    },
    { timestamps: true },
)
const Flight = mongoose.model('Flight', FlightSchema)

module.exports = Flight