const validationResult = require('express-validator').validationResult
const Travel = require('../models/travel.model')
const api = require('../api/flightlabs.api')
const date = require('../utils/dates.util')

const controller = {
    getAll: async function (req, res, next) {
        try {
            const travels = await Travel.find({ userId: req.user.id })

            if (travels?.length) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    success: true,
                    data: travels,
                })
            } else {
                res.status(204).send()
            }
        } catch (err) {
            next(err)
        }
    },

    deleteAll: async function (req, res, next) {
        try {
            await Travel.deleteMany({ userId: req.user.id })
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    },

    getOne: async function (req, res, next) {
        try {
            const travel = await Travel.findOne({ _id: req.params.id, userId: req.user.id })

            if (travel) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    success: true,
                    data: travel,
                })
            } else {
                res.status(404).send()
            }
        } catch (err) {
            next(err)
        }
    },

    addOne: async function (req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                })
            }

            const params = {
                userId: req.user.id,
                origin: req.body.origin,
                destination: req.body.destination,
                departureDate: req.body.departureDate,
            }

            if (req.body.returnDate) {
                params.returnDate = req.body.returnDate
            }
            if (req.body.numberOfAdults) {
                params.numberOfAdults = req.body.numberOfAdults
            }
            if (req.body.cabinClass) {
                params.cabinClass = req.body.cabinClass
            }

            const travel = new Travel(params)
            await travel.save()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({
                success: true,
                data: travel,
            })
        } catch (err) {
            next(err)
        }
    },

    deleteOne: async function (req, res, next) {
        try {
            const travel = await Travel.findOne({ _id: req.params.id, userId: req.user.id })

            if (travel) {
                await travel.remove()
                res.status(204).send()
            } else {
                res.status(403).send()
            }
        } catch (err) {
            next(err)
        }
    },

    getBestFlights: async function (req, res, next) {
        try {
            const travel = await Travel.findOne({ _id: req.params.id, userId: req.user.id })
            if (!travel) {
                res.status(404).json({
                    success: false,
                    message: 'Travel not found ...',
                })
            }
            const response = await api.getBestFlights(
                travel.numberOfAdults,
                travel.origin,
                travel.destination,
                date.format(travel.departureDate),
                date.format(travel.returnDate),
                travel.cabinClass,
            )
            if (response.data.success) {
                const { best, cheapest, fastest } = api.parseResponse(response.data.data, !!travel.returnDate)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    success: true,
                    data: { best, cheapest, fastest },
                })
            } else {
                res.status(404).send(response.data.data)
            }
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
