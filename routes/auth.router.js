const express = require('express')
const router = express.Router()
const body = require('express-validator').body
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/auth.controller')

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user authentication API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAccessAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 *     cookieRefreshAuth:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User log in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: User was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Cannot log in based on the authentication data, wrong data or banned user
 *       500:
 *         description: Internal server error
 */
router.post(
    '/login',
    body('username').isLength({ min: 3, max: 10 }).isAlphanumeric(),
    body('password').isLength({ min: 5, max: 20 }),
    authenticate.verifyUserLocal,
    controller.login,
)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: An error occurred during user creation, contact the administrator
 *       500:
 *         description: Internal server error
 */
router.post(
    '/register',
    body('username').isLength({ min: 3, max: 10 }).isAlphanumeric(),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 20 }).isStrongPassword(),
    controller.register,
)

/**
 * @swagger
 * /api/auth/refresh:
 *   get:
 *     summary: User renew access & refresh token
 *     tags: [Authentication]
 *     security:
 *       - cookieRefreshAuth: [ ]
 *     responses:
 *       200:
 *         description: User was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/refresh', authenticate.verifyUserJwtRefresh, controller.refresh)

/**
 * @swagger
 * /api/auth/revoke:
 *   patch:
 *     summary: Refresh token revocation
 *     tags: [Authentication]
 *     security:
 *       - cookieRefreshAuth: [ ]
 *     responses:
 *       200:
 *         description: User refresh token was successfully revoked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.patch('/revoke', authenticate.verifyUserJwt, controller.revoke)

module.exports = router
