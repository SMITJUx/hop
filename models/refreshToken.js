const mongoose = require('mongoose')
const expireIn = require('../config').auth.expireIn

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
