const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/users.controller')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users access API
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get own user information
 *     tags: [Users]
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/me', authenticate.verifyUserJwt, controller.getMe)

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Access specific user information, only if you are an administrator
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *         type: string
 *         required: true
 *         description: Unique user username
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/:username', authenticate.verifyUserAdminJwt, controller.getUser)

module.exports = router
