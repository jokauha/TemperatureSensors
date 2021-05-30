const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://root:root@192.168.100.25:7878/temperatures')

var TemperatureModel = sequelize.define('data', {
  temperature: {
    type: DataTypes.NUMBER,
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
  sensorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SensorModel',
      key: 'id',
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

var SensorModel = sequelize.define('sensors', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  }
)

SensorModel.hasMany(TemperatureModel)
TemperatureModel.belongsTo(SensorModel)

module.exports = { TemperatureModel, SensorModel }