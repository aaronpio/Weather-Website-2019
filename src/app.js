const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')

const log = console.log

const app = express()
const port = process.env.PORT  || 3000

// Define oaths for express config
const publicDir = path.join(__dirname, '..', '/public')
const viewsPath = path.join(__dirname, '..', '/templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(express.static(publicDir))


//--------------------- Home Page ------------------------
app.get('', (req, res) => {       //set up index.hbs
    res.render('index', {
        title: 'Weather App',
        name: 'Aaron'
    })
})

//--------------------- About Page -----------------------
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Aaron'
    })
})

//--------------------- Help Page -----------------------
app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'You really need some help',
        title: 'Help Page',
        name: 'Aaron'  
    })
})

//--------------------- Products Page -----------------------
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You gotta provide a search term dude'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//--------------------- Weather Page -----------------------
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You gotta provide an address dude'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                query: req.query.address,
                location: data.location,
                forecast: forecastData.summary
            })
        })
    })
})

//--------------------- Help 404 Page -----------------------
//catch all for /help/... 404's
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help can\'t help you now',
        msg: 'bad move',
        name: 'Aaron'
    })
})

//--------------------- 404 Page -----------------------
//* wildcard character(*) matches any get that hasn't been established. 
//Our 404 page. Needs to be the last page after all others.
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'You Broke It -404-',
        msg: ':( :( :(',
        name: 'Aaron'
    })
})


app.listen(port, () => {
    console.log(`server is up on port ${port} yo`)
})