const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        roles: {
            type: [String],
            enum: ['CUSTOMER', 'STAFF', 'ADMIN'],
            default: ['CUSTOMER'],
        },
    },
    { timestamps: true },
)

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)

module.exports = User
