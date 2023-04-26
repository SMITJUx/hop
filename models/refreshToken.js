const mongoose = require('mongoose')
const config = require('../config').auth

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
    },
    { timestamps: true },
)

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

module.exports = RefreshToken
