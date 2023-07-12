const WeatherModel = require('../models/weather_model');

module.exports = {
  saveWeather: async function (weatherData) {
    const newWeather = new WeatherModel(weatherData);
    await newWeather.save();
    return newWeather;
  },
  getWeather: async function (user) {
    const weatherData = await WeatherModel.find({ user });
    return weatherData;
  },
};