const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Travel:
 *       type: object
 *       required:
 *         - userId
 *         - origin
 *         - destination
 *         - departureDate
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the travel
 *         userId:
 *           type: string
 *           description: User id related to this travel
 *         numberOfAdults:
 *           type: integer
 *           description: Number of adults related to this travel
 *         origin:
 *           type: string
 *           description: Travel origin city in format IATA Code
 *         destination:
 *           type: string
 *           description: Travel destination in format IATA Code
 *         departureDate:
 *            type: string
 *            format: date
 *            description: Departure date for this travel in format YYYY-MM-DD
 *         returnDate:
 *            type: string
 *            format: date
 *            description: Return date for this travel in format YYYY-MM-DD
 *         cabinClass:
 *            type: string
 *            enum: [economy, premiumeconomy, business, first]
 *            description: Type of class for flights
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the travel was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The last date when the user updated the travel
 */
const TravelSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        numberOfAdults: {
            type: Number,
            min: 1,
            max: 8,
            default: 1,
        },
        origin: {
            type: String,
            minLength: 3,
            maxLength: 3,
            required: true,
        },
        destination: {
            type: String,
            minLength: 3,
            maxLength: 3,
            required: true,
        },
        departureDate: {
            type: Date,
            required: true,
        },
        returnDate: {
            type: Date,
            default: null,
        },
        cabinClass: {
            type: String,
            enum: ['economy', 'premiumeconomy', 'business', 'first'],
            default: 'economy',
        },
    },
    { timestamps: true },
)

const Travel = mongoose.model('Travel', TravelSchema)

module.exports = Travel
