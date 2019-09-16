
//---------------------- Geocode API Request -----------------------------
// makes an API request to mapbox using an inputted location (string) and gives back the longitude and latitude
//required in app.js

const request = require('request')

const geocode = (address, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA&limit=1`
    request({url: geoURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service')
        } else if (response.body.features.length === 0) {
            callback('No Matching Location')
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode