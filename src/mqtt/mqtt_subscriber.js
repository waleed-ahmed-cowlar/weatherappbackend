const mqtt = require('mqtt')
const mqttBrokerUrl = 'mqtt://localhost:1883' // MQTT broker URL
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

async function listen_to_data() {
    const client = mqtt.connect(mqttBrokerUrl, clientId)

    client.on('connect', () => {
        console.log('Connected to MQTT broker in subscriber')
        // Subscribe to a topic
        client.subscribe('weather')
    })
    client.on('message', (topic, message) => {
        console.log(`Received message on topic: ${topic}`)
        console.log(`Message: ${message}`)
    })
}
module.exports = listen_to_data
