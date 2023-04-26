const mongoose = require('mongoose')

const AirportSchema = new mongoose.Schema(
    {
        iata_code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Airport = mongoose.model('Airport', AirportSchema)

module.exports = Airport
