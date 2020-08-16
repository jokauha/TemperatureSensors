var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.69.69.70')

var temps = []
var tempname

client.on('connect', function () {
  client.subscribe('muenster/#', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  // console.log(topic.toString() + ': ' + message.toString())
  if(topic.includes('temp')) {

    tempname = topic
                .toString()
                .slice(9)
                .replace("/", "")
                .replace("temp", "")
                .replace("olohuoneoutside", "ulko")
                .replace("keittiojaakaappi", "jaakaappi")

    temps.push({name: tempname, temperature: JSON.parse(message.toString()).temperature, date: new Date()})
  }

  console.log(temps)
  // client.end()
})