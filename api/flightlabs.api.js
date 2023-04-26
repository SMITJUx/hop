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

const parseSegment = (segment) => {
    return {
        flightNumber: segment.flightNumber,
        price: segment.pricingOptions[0].amount,
        origin: {
            airport: segment.origin.flightPlaceId,
            city: segment.origin.name,
        },
        destination: {
            airport: segment.destination.flightPlaceId,
            city: segment.destination.name,
        },
        departureDate: segment.departure,
        arrivalDate: segment.arrival,
        durationInMinutes: segment.durationInMinutes,
        link: segment.deeplink,
    }
}

const parseSegments = (segments) => {
    const result = []
    segments.forEach((segment) => result.push(parseSegment(segment)))
    return result
}

exports.parseResponse = (data) => {
    try {
        return {
            BEST: parseSegments(data.buckets[0].legs[0].segments),
            CHEAPEST: parseSegments(data.buckets[1].items[0].legs[0].segments),
            FASTEST: parseSegments(data.buckets[2].items[0].legs[0].segments),
            DIRECT: parseSegments(data.buckets[3].items[0].legs[0].segments),
        }
    } catch (err) {
        throw new Error('Error while parsing flights API response ...')
    }
}
