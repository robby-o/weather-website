const request = require('postman-request')

const weatherAPI = '25fa594b3e59527b4afdd78c0c2b8188'

const forecast = (latitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb(
        'Unable to connect to location services!',
        undefined
      )
    } else if (response.body.error) {
      cb(
        'Unable to find location. Try another search.',
        undefined
      )
    } else {
      console.log(response.body.current)
      cb(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} and feels like ${response.body.current.feelslike}.`
      )
    }
  })
}

module.exports = forecast
