const config = require('../config')
const axios = require('axios')

exports.getBestFlights = async (
    adults,
    origin,
    destination,
    departureDate,
    returnDate,
    cabinClass,
) => {
    console.log('[BEST FLIGHTS] Starting inside ...')
    return axios.get(config.api.baseUrl + '/search-best-flights', {
        params: {
            access_key: config.api.key,
            adults,
            origin,
            destination,
            departureDate,
            returnDate,
            cabinClass,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
