const axios = require('axios')
const mqtt = require('mqtt')

// const mqttBrokerUrl = 'mqtt://localhost:1883' // MQTT broker URL
// const mqttTopic = 'weather-data' // MQTT topic to publish the weather data
// const protocol = 'mqtt'
// const host = 'localhost'
// const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// const connectUrl = `${protocol}://${host}:${port}`
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function fetchWeatherData() {
    const client = mqtt.connect('mqtt://mosquitto', 1883, clientId)
    // console.log(client)

    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            client.on('connect', () => {
                console.log('Connected to MQTT broker')
            })
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: { q: 'islamabad' },
                headers: {
                    'X-RapidAPI-Key':
                        '42484a2fcfmshe2ab2f656d2e3bep18582fjsn25157a80e947',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                },
            }
            // Fetch weather data from the Weather API
            const response = await axios.request(options)
            // console.log(response.data)

            const weatherData = response.data
            client.publish('weather', JSON.stringify(weatherData))
            await sleep(5000)

            // // Connect to the MQTT broker and publish the weather data

            client.on('error', (error) => {
                console.error('MQTT connection error:', error)
            })

            client.on('close', () => {
                console.log('MQTT connection closed')
            })
            //
            client.on('offline', () => {
                console.log('MQTT client is offline')
            })
        } catch (error) {
            console.error('Failed to fetch weather data:', error.message)
        }
    }
}

// Call the fetchWeatherData function to fetch data from Weather API and publish to MQTT broker
module.exports = fetchWeatherData
