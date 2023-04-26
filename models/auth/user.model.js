const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const roles = require('../../config').roles

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
            enum: [roles.customer, roles.staff, roles.admin],
            default: [roles.customer],
        },
    },
    { timestamps: true },
)

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)

module.exports = User
