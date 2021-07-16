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
<<<<<<< HEAD
        participant: {
            type: DataTypes.STRING,
        },
=======
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
        maxPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
<<<<<<< HEAD
        host: {
            type: DataTypes.STRING,
        },
=======
        createdAt : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            get() {
                return formatTime(this)
            }
        }
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
    }, {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Ad.associate = models => {
<<<<<<< HEAD
        Ad.belongsTo(models.User, { foreignKey: { name: 'userId' } })
        Ad.hasMany(models.Comment, { foreignKey: { name: 'adId' } })
=======
        Ad.belongsToMany(models.User, { 
            foreignKey: 'adId', 
            as: 'UsersInAd', 
            through: models.Party 
        })
        Ad.hasMany(models.Comment, { foreignKey: { name: 'adId' }})
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
    }

    return Ad
}