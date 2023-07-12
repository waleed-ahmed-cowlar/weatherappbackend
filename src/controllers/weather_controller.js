const weatherService = require('../services/weather_services');

module.exports = {
  saveWeather: async function (req, res) {
    const weatherData = req.body;
    try {
      const newWeather = await weatherService.saveWeather(weatherData);
      res.json({ success: true, data: newWeather });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  getWeather: async function (req, res) {
    const user = req.body.user;
    try {
      const weatherData = await weatherService.getWeather(user);
      res.json({ success: true, data: weatherData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
