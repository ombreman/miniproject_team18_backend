module.exports = (sequelize, DataTypes) => {
    const Ad = sequelize.define('Ad', {
        title: {
          type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "CS"
        },
        content: {
            type: DataTypes.TEXT,
        },
        participant:{
            type: DataTypes.STRING,
        },
        maxPeople:{ 
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: true,
        updateAt: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Ad.associate = models => {
        Ad.belongsTo(models.User, { foreignKey: { name: 'userId' }})
        Ad.hasMany(models.Comment, { foreignKey: { name: 'adId' }})
    }

    return Ad
}