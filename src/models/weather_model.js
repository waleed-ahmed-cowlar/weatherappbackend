const { Schema, model } = require('mongoose')
const UserModel = require('./user_model')
var weatherSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: UserModel },
    cloud_pct: { type: Number, default: 0 },
    temp: { type: Number, default: 0 },
    feels_like: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 },
    min_temp: { type: Number, default: 0 },
    max_temp: { type: Number, default: 0 },
    wind_speed: { type: Number, default: 0 },
    wind_degrees: { type: Number, default: 0 },
    sunrise: { type: Number, default: 0 },
    sunset: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
})
const WeatherModel = model('Weather', weatherSchema)
module.exports = WeatherModel
