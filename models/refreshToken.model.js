const mongoose = require('mongoose')
const expireIn = require('../config').auth.expireIn

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       required:
 *         - userId
 *         - value
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the travel
 *         userId:
 *           type: string
 *           description: User id related to this refresh token
 *         value:
 *           type: string
 *           description: Refresh token value
 *         revoked:
 *           type: string
 *           description: Date when the refresh token was invalidated
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the refresh token was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The last date when the refresh token was updated
 */
const RefreshTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        revoked: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            expires: expireIn.refreshToken,
            default: Date.now,
        },
    },
    { timestamps: true },
)

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

module.exports = RefreshToken
