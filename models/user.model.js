const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const roles = require('../config').roles

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: User username
 *         password:
 *           type: string
 *           description: User password
 *         email:
 *           type: string
 *           description: User email
 *         roles:
 *           type: array
 *           description: Roles of the user
 *         revoked:
 *            type: string
 *            format: date
 *            description: Date when this user got banned
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The last date when the user was updated
 */
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        roles: {
            type: [String],
            enum: [roles.customer, roles.staff, roles.admin],
            default: roles.customer,
        },
        revoked: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
)

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)

module.exports = User
