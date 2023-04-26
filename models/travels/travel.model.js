const mongoose = require('mongoose')

const TravelSchema = new mongoose.Schema(
    {
        numberOfAdults: {
            type: Number,
            min: 1,
            max: 8,
            default: 1
        },
        origin: {
            type: String,
            minLength: 3,
            maxLength: 3,
            required: true
        },
        destination: {
            type: String,
            minLength: 3,
            maxLength: 3,
            required: true
        },
        departureDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date,
            required: true
        },
        cabinClass: {
            type: String,
            enum: ['economy', 'premiumeconomy', 'business', 'first'],
            default: ['economy'],
        }
    },
    { timestamps: true },
)

const Travel = mongoose.model('Travel', TravelSchema)

module.exports = Travel