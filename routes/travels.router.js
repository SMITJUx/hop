const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth.middleware')
const controller = require('../controllers/travels.controller')

/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: The travels data API
 */

/**
 * @swagger
 * /api/travels:
 *   get:
 *     summary: Get all travels related to an authenticated user
 *     tags: [Travels]
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       200:
 *         description: Successfully retrieved travels information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Travel'
 *       204:
 *         description: No travel found
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate.verifyUserJwt, controller.getAll)

/**
 * @swagger
 * /api/travels:
 *   post:
 *     summary: Add a new travel for a user
 *     tags: [Travels]
 *     security:
 *       - cookieAccessAuth: [ ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numberOfAdults:
 *                 type: integer
 *                 description: Number of adults related to this travel
 *               origin:
 *                 type: string
 *                 required: true
 *                 description: Travel origin city in format IATA Code
 *               destination:
 *                 type: string
 *                 required: true
 *                 description: Travel destination in format IATA Code
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 required: true
 *                 description: Departure date for this travel in format YYYY-MM-DD
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Return date for this travel in format YYYY-MM-DD
 *               cabinClass:
 *                 type: string
 *                 enum: [economy, premiumeconomy, business, first]
 *                 description: Type of class for flights
 *     responses:
 *       200:
 *         description: Successfully retrieved travels information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Travel'
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate.verifyUserJwt, controller.addOne)

/**
 * @swagger
 * /api/travels:
 *   delete:
 *     summary: Delete user's travels
 *     tags: [Travels]
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       204:
 *         description: Successfully deleted user's travels
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       500:
 *         description: Internal server error
 */
router.delete('/', authenticate.verifyUserJwt, controller.deleteAll)

/**
 * @swagger
 * /api/travels/{id}:
 *   get:
 *     summary: Get one travel related to an authenticated user
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: integer
 *         required: true
 *         description: Travel object unique id
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       200:
 *         description: Successfully retrieved travel information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Travel'
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       404:
 *         description: The travel doesn't exist
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticate.verifyUserJwt, controller.getOne)

/**
 * @swagger
 * /api/travels/{id}:
 *   delete:
 *     summary: Delete user specific travel
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: integer
 *         required: true
 *         description: Travel object unique id
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       204:
 *         description: Successfully deleted the travel
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       403:
 *         description: The travel doesn't exist
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate.verifyUserJwt, controller.deleteOne)

/**
 * @swagger
 * /api/travels/best-flights/{id}:
 *   get:
 *     summary: Get best flights for a travel related to a user
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: integer
 *         required: true
 *         description: Travel object unique id
 *     security:
 *       - cookieAccessAuth: [ ]
 *     responses:
 *       200:
 *         description: Successfully retrieved travel information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     best:
 *                       type: object
 *                     cheapest:
 *                       type: object
 *                     fastest:
 *                       type: object
 *                     direct:
 *                       type: object
 *       401:
 *         description: Cannot authorize access to this endpoint
 *       404:
 *         description: The travel doesn't exist or the API can't find flights for your travel
 *       500:
 *         description: Internal server error
 */
router.get('/best-flights/:id', authenticate.verifyUserJwt, controller.getBestFlights)

module.exports = router
