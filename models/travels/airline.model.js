const mongoose = require('mongoose')

const AirlineSchema = new mongoose.Schema(
    {
        nameAirline: {
            type: String,
            required: true,
        },
        codeIataAirline: {
            type: String,
            required: true,
            unique: true,
        },
        codeIcaoAirline: {
            type: String,
            required: true,
            unique: true,
        },
        codeIso2Country: {
            type: String,
            required: true,
            unique: true,
        },
        statusAirline: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Airline = mongoose.model('Airline', AirlineSchema)

module.exports = Airline
