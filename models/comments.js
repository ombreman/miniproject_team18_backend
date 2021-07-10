module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT
        },
    }, {
        timestamps: true,
        updateAt: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: { name: 'userId' }})
        Comment.belongsTo(models.Ad, { foreignKey: { name: 'adId' }})
    }

    return Comment
}