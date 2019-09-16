
//---------------------- Forecast API Request -----------------------------
// makes an API request to darksky using a longitude and latitude (string) and gives back the weather forecast
// required in app.js

const request = require('request')

const key = `572938371cf5f35c728ba357a3f15dae`

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (response.body.error) {
            callback('Unable to find location.')
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast