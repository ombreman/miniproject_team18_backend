const formatTime = require('./../utils/moment')

module.exports = (sequelize, DataTypes) => {
    const Ad = sequelize.define('Ad', {
        title: {
          type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "CS"
        },
        host: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT,
        },
        maxPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            get() {
                return formatTime(this)
            }
        }
    }, {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Ad.associate = models => {
        Ad.belongsToMany(models.User, { 
            foreignKey: 'adId', 
            as: 'UsersInAd', 
            through: models.Party 
        })
        Ad.hasMany(models.Comment, { foreignKey: { name: 'adId' }})
    }

    return Ad
}