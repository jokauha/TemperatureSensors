const sensorsRouter = require('express').Router()
const { SensorModel } = require('../models/temperature')

sensorsRouter.get('/', async (req, res) => {
    const sensors = await SensorModel.findAll()
    res.json(sensors)
})

module.exports = sensorsRouter