const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temperatures.sqlite'
});

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
  sensorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

var SensorModel = sequelize.define('anturit', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = { TemperatureModel, SensorModel }