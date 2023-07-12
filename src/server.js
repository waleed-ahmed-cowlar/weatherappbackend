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

mongoose.connect('mongodb://localhost:27017/ecommerce_learning_App')

const PORT = process.env.PORT || 5000

const userRoutes = require('./routes/user_routes')

app.use('/user', userRoutes)

const weatherRoutes = require('./routes/weather_routes')

app.use('/weather', weatherRoutes)

app.listen(PORT, function () {
    console.log('server started on port 5000')
})
//user model-->route-->controller-->model
