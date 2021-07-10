const Sequelize = require('sequelize')
const { config } = require('./../config/config.json')
const Comment = require('./comments')
const Ad = require('./ads')
const User = require('./users')

const sequelize = new Sequelize(config)
const dataTypes = Sequelize.DataTypes

const models = {}

models.sequelize = sequelize
models.User = User(sequelize, dataTypes)
models.Ad = Ad(sequelize, dataTypes)
models.Comment = Comment(sequelize, dataTypes)

models.User.associate(models)
models.Ad.associate(models)
models.Comment.associate(models)

module.exports = models