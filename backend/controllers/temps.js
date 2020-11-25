const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
const tempsRouter = require('express').Router()
const TemperatureModel = require('../models/temperature').TemperatureModel

tempsRouter.get('/', async (req, res) => {
    const temps = await TemperatureModel.findAll()
    res.json(temps)
})
  
tempsRouter.get('/sensor/:name', async (req, res) => {
    const sensorName = req.params.name
    const sensorID = anturit.find(sensor => sensor.name === sensorName).id
    const temps = await TemperatureModel.findAll({
        where: {
        sensorID: sensorID
        }
    })
    res.json(temps)
})
  
tempsRouter.get('/recent', async (req, res) => {
    const start = new Date(Date.now() - 86400 * 1000)

    const temps = await TemperatureModel.findAll({
        where: {
            date: {
                [Op.gte]: start
            }
        }
    })
    res.json(temps)
})

module.exports = tempsRouter