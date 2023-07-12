const router = require('express').Router()
const weatherContollers = require('../controllers/weather_controller')
const verify = require('../middlewares/jwt')

router.get('/', async function (req, res) {
    res.json({ success: true, data: 'weather data' })
})
router.post('/saveWeather', weatherContollers.saveWeather)
router.get('/getweather', verify, weatherContollers.getweather)

module.exports = router
