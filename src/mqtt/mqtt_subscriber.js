const mqtt = require('mqtt')
const mqttBrokerUrl = 'mqtt://localhost:1883' // MQTT broker URL
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const writeDataToInfluxDB = require('./../influxdb/write_influxdb')

async function listen_to_data() {
    const client = mqtt.connect(mqttBrokerUrl, clientId)

    client.on('connect', () => {
        console.log('Connected to MQTT broker in subscriber')
        // Subscribe to a topic
        client.subscribe('weather')
    })
    client.on('message', (topic, message) => {
        message
        console.log(`Received message on topic: ${topic}`)
        // writeDataToInfluxDB(message)
        // console.log(`Message: ${message.location}`)
        var decoder = new TextDecoder('utf-8')
        var str = decoder.decode(message)

        // console.log(str)
        
        var json = JSON.parse(str)
        // console.log(json.current.temp_c)
        writeDataToInfluxDB(json.current.temp_c)
                
    })
}
module.exports = listen_to_data
