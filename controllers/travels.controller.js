const Travel = require('../models/travel.model')
const api = require('../api/flightlabs.api')

const controller = {
    getAll: async function (req, res, next) {
        try {
            const travels = await Travel.find({ userId: req.user.id })

            if (travels?.length) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(travels)
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
                res.json(travel)
            } else {
                res.status(404).send()
            }
        } catch (err) {
            next(err)
        }
    },

    addOne: async function (req, res, next) {
        try {
            const params = {
                userId: req.user.id,
                origin: req.params.origin,
                destination: req.params.destination,
                departureDate: req.params.departureDate,
                returnDate: req.params.returnDate,
            }

            if (req.params.numberOfAdults) {
                params.numberOfAdults = req.params.numberOfAdults
            }
            if (req.params.cabinClass) {
                params.cabinClass = req.params.cabinClass
            }

            console.log('[LOG] WTF, we are still creating the travel: ', params)
            const travel = new Travel(params)
            await travel.save()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(travel)
        } catch (err) {
            console.log('[LOG] Exception caught: ', err)
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
            if (response?.ok) {
                if (!response.data.success) {
                    res.status(404).send(response.data.data)
                    return
                }
                const { best, cheapest, fastest, direct } = api.parseResponse(response.data.data)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({ best, cheapest, fastest, direct })
            } else {
                res.status(404).send('Error while calling external flights API ...')
            }
        } catch (err) {
            next(err)
        }
    },
}

module.exports = controller
