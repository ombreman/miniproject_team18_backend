module.exports = (sequelize, DataTypes) => {
    const Party = sequelize.define('Party', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: 'unique-user-per-ad'
        },
        adId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Ad',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: 'unique-user-per-ad'
        },
    }, {
        timestamps: false
    })

    Party.associate = models => {
        Party.belongsTo(models.User, { foreignKey: 'userId', as: 'User'})
        Party.belongsTo(models.Ad, { foreignKey: 'adId', as: 'Ad'})
    }

    return Party
}