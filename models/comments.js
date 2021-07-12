module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT
        },
        createdAt : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: { name: 'userId' }})
        Comment.belongsTo(models.Ad, { foreignKey: { name: 'adId' }})
    }

    return Comment
}