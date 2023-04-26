const Travel = require('../../models/travels/travel.model')
const api = require('../../api/flightlabs.api')

const controller = {
    getAll: async function (req, res, next) {
        try {
            const travels = await Travel.find({ userId: req.user.id })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(travels)
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
            const travels = await Travel.findOne({ _id: req.params.id, userId: req.user.id })

            if (travels) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(travels)
            } else {
                res.status(404).send()
            }
        } catch (err) {
            next(err)
        }
    },

    addOne: async function (req, res, next) {
        try {
            const travel = new Travel({ userId: req.user.id, ...req.body })
            travel.save()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(travel)
        } catch (err) {
            next(err)
        }
    },

    deleteOne: async function (req, res, next) {
        try {
            const travel = Travel.findOne({ _id: req.params.id, userId: req.user.id })

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
            const response = await api.getBestFlights(
                req.body.adults,
                req.body.origin,
                req.body.destination,
                req.body.departureDate,
                req.body.returnDate,
                req.body.cabinClass,
            )
            const status = response.status
            if (response.status) {
                const data = response.data
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(data)
            } else {
                // TODO
                res.status(404).send()
            }
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
