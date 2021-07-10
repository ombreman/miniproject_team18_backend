const Sequelize = require('sequelize') // 라이브러리를 불러왔다.
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const User = require('./users')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const db = {}
db.sequelize = sequelize
db.User = User( sequelize, Sequelize.DataTypes)
module.exports = db