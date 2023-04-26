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

const parseFlight = (data) => {
    return {
        flightNumber: data.flightNumber,
        company: data.operatingCarrier.name,
        origin: data.origin,
        destination: data.destination,
        departure: data.departure,
        arrival: data.arrival,
        durationInMinutes: data.durationInMinutes,
    }
}
const parseFlights = (data) => {
    const result = []
    data.forEach((flight) => {
        result.push(parseFlight(flight))
    })
    return result
}
const parseTravel = (data) => {
    return {
        origin: data.origin,
        destination: data.destination,
        durationInMinutes: data.durationInMinutes,
        departure: data.departure,
        arrival: data.arrival,
        flights: parseFlights(data.segments),
    }
}
exports.parseResponse = (data, isReturnedDate) => {
    try {
        return {
            best: {
                price: data.buckets[0].items[0].price.formatted,
                ...parseTravel(data.buckets[0].items[0].legs[0]),
                ...(isReturnedDate ? parseTravel(data.buckets[0].items[0].legs[1]) : {}),
                link: data.buckets[0].items[0].deeplink,
            },
            cheapest: {
                price: data.buckets[1].items[0].price.formatted,
                ...parseTravel(data.buckets[1].items[0].legs[0]),
                ...(isReturnedDate ? parseTravel(data.buckets[1].items[0].legs[1]) : {}),
                link: data.buckets[1].items[0].deeplink,
            },
            fastest: {
                price: data.buckets[2].items[0].price.formatted,
                ...parseTravel(data.buckets[2].items[0].legs[0]),
                ...(isReturnedDate ? parseTravel(data.buckets[2].items[0].legs[1]) : {}),
                link: data.buckets[2].items[0].deeplink,
            },
        }
    } catch (err) {
        throw err
    }
}
