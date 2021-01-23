const express = require('express')
const app = express()
const cors = require('cors')
const tempsRouter = require('./controllers/temps')
let anturit = require('./anturit.json')
var mqtt = require('mqtt')
const sensorsRouter = require('./controllers/sensors')

const TemperatureModel = require('./models/temperature').TemperatureModel

app.use(cors())
app.use(express.json())

app.use('/api/temps', tempsRouter)
app.use('/api/sensors', sensorsRouter)

var client = mqtt.connect('mqtt://192.168.100.25')
client.on('connect', () => {
    client.subscribe('#', (err) => {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})
client.on('message', (topic, message) => {
    // message is Buffer
    // console.log(topic.toString() + ': ' + message.toString())
  
    anturit.forEach(anturi => {
      //console.log(anturi)
      if(topic === anturi.topic) {
        //console.log(anturi)
        if(anturi.type === "ds18b20") {
          TemperatureModel.create({
            temperature: JSON.parse(message.toString()).temperature,
            sensorID: anturi.id,
            date: new Date()
          })
        }
        else if(anturi.type === "rpi") {
          TemperatureModel.create({
            temperature: message,
            sensorID: anturi.id,
            date: new Date()
          })
        }
        else {
          TemperatureModel.create({
            temperature: JSON.parse(message.toString()).temperature,
            humidity: JSON.parse(message.toString()).humidity,
            pressure: JSON.parse(message.toString()).pressure,
            sensorID: anturi.id,
            date: new Date()})
        }
      }
    })
  
    // console.log(temps)
    // client.end()
})

module.exports = app
