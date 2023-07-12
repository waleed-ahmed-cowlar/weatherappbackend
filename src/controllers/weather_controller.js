const WeatherModel = require('../models/weather_model')
const weatherContollers = {
    saveWeather: async function (req, res) {
        const weatherData = req.body
        const newWeather = new WeatherModel(weatherData)
        await newWeather.save()
        res.json({ success: true, data: newWeather })
    },
    getweather: async function (req, res) {
        const weatherData = await WeatherModel.find({ user: req.body.user })
        res.json({ success: true, data: weatherData })
    },
}
module.exports = weatherContollers
