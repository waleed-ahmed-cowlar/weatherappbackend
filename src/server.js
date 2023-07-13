require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
const fetchWeatherData = require('./mqtt/mqtt_publisher')
const listen_to_data = require('./mqtt/mqtt_subscriber')

fetchWeatherData()
listen_to_data()
let mongoConnectString = ''
if (process.env.NODE_ENV == 'test') {
    mongoConnectString = process.env.test_url_developement
} else {
    mongoConnectString = process.env.mongo_url_development
}
// console.log(mongoConnectString)
mongoose.connect(mongoConnectString)

let PORT = process.env.PORT || 5000
if (process.env.NODE_ENV == 'test') {
    PORT = 5001
}

const userRoutes = require('./routes/user_routes')
module.exports = app

app.use('/user', userRoutes)

const weatherRoutes = require('./routes/weather_routes')

app.use('/weather', weatherRoutes)

app.listen(PORT, function () {
    console.log(`server started on port ${PORT}`)
})
//user model-->route-->controller-->model
