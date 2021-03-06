const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

const app = express()
const PORT = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(
  __dirname,
  '../public'
)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(
  __dirname,
  '../templates/partials'
)

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'R',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'R',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    help: 'run away',
    name: 'R',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(
        latitude,
        longitude,
        (error, forecastData) => {
          if (error) {
            return res.send({ error })
          }

          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          })
        }
      )
    }
  )
})

app.get('/products', async (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'this aint the help page',
  })
})

app.get('*', async (req, res) => {
  res.render('404', {
    title: '404',
    error: 'you lost nigga',
  })
})

app.listen(PORT, console.log(`listening on port ${PORT}`))
