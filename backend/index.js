let anturit = require('./anturit.json')

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.69.69.70')

const express = require('express')

const app = express()

const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/temps', (req, res) => {
  TemperatureModel.findAll().then( (temps) => res.json(temps) )
})

app.get('/api/temps/sensor/:name', (req, res) => {
  const sensorName = req.params.name
  TemperatureModel.findAll({
    where: {
      name: sensorName
    }
  })
    .then( (temps) => res.json(temps) )
})

app.get('/api/temps/recent', (req, res) => {
  const start = new Date(Date.now() - 86400 * 1000)
  TemperatureModel.findAll({
    where: {
      date: {
        [Op.gte]: start
      }
    }
  })
    .then( (temps) => res.json(temps) )
})

const port = 4001
app.listen(port, () => {
  console.log('Server running on port ' + port)
})

var temps = []
var tempname

client.on('connect', () => {
  client.subscribe('muenster/#', (err) => {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', (topic, message) => {
  // message is Buffer
  //console.log(topic.toString() + ': ' + message.toString())

  anturit.forEach(anturi => {
    //console.log(anturi)
    if(topic === anturi.topic) {
      //console.log(anturi)
      if(anturi.type === "ds18b20") {
        TemperatureModel.create({
          name: anturi.name,
          temperature: JSON.parse(message.toString()).temperature,
          date: new Date()
        })
      }
      else {
        TemperatureModel.create({
          name: anturi.name,
          temperature: JSON.parse(message.toString()).temperature,
          humidity: JSON.parse(message.toString()).humidity,
          pressure: JSON.parse(message.toString()).pressure,
          date: new Date()})
      }
    }
  })

  /*if(topic.includes('temp')) {

    tempname = topic
                .toString()
                .slice(9)
                .replace("/", "")
                .replace("temp", "")
                .replace("keittiojaakaappi", "jaakaappi")

    // temps.push({name: tempname, temperature: JSON.parse(message.toString()).temperature, date: new Date()})

    if(JSON.parse(message.toString()).humidity !== undefined) {
      TemperatureModel.create({
        name: tempname,
        temperature: JSON.parse(message.toString()).temperature,
        humidity: JSON.parse(message.toString()).humidity,
        pressure: JSON.parse(message.toString()).pressure,
        date: new Date()})
    }
    else {
      TemperatureModel.create({
        name: tempname,
        temperature: JSON.parse(message.toString()).temperature,
        date: new Date()})
        //.then(item=>(console.log("success " + item)))
    }
  }*/

  console.log(temps)
  // client.end()
})

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temperatures.sqlite'
});
const Op = Sequelize.Op

class TemperatureModel extends Model {}

TemperatureModel.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temperature: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  humidity: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  pressure: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TemperatureModel', // We need to choose the model name
  tableName: 'Temperatures',
  timestamps: false
});

// the defined model is the class itself
// console.log(TemperatureModel === sequelize.models.TemperatureModel); // true