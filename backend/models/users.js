const formatTime = require('../utils/moment')
const hash = require('object-hash')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        accountId: {
            type: DataTypes.STRING(16),
            unique: true,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(16),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,

            set(password) { return this.setDataValue('password', hash(password)) }
        },
        createdAt : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            get() { return formatTime(this) }
        }
    }, {
        timestamps: false
    })

    User.associate = models => {
        User.belongsToMany(models.Ad, { 
            foreignKey: 'userId', 
            as: 'AdsForUser', 
            through: models.Party 
        })
        User.hasMany(models.Comment, { foreignKey: { name: 'userId' }})
    }

    return User
}