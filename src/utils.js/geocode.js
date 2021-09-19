const request = require('postman-request')

const geocodeAPI =
  'pk.eyJ1IjoicnVnY2F0Y2hlciIsImEiOiJja3RucmYzODQwNW4yMnFvOTdlZHF1aGE3In0.5FyVYeBNBVmlwflclE3JLQ'

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${geocodeAPI}&limit=1`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      cb(
        'Unable to connect to location services!',
        undefined
      )
    } else if (response.body.features.length === 0) {
      cb(
        'Unable to find location. Try another search.',
        undefined
      )
    } else {
      cb(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
