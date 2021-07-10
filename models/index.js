const Sequelize = require('sequelize')// import library 
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const Comment = require("./comments")
const Ad = require("./ads")

// instanciate by library 
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
const db = {}
db.sequelize = sequelize  // insert sequelize in to object
db.Comment = Comment(sequelize, Sequelize.DataTypes)
db.Ad = Ad(sequelize, Sequelize.DataTypes)  //  question => how do we know this part ? cuz the function using this two parameters to make the model

db.Ad.hasMany(db.Comment)

module.exports = db
