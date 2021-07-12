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

            set(password) {
                this.setDataValue('password', hash(password))
            }
        }
    }, {
        timestamps: true,
        updateAt: false
    })

    User.associate = models => {
        User.hasMany(models.Ad, { foreignKey: { name: 'userId' } })
        User.hasMany(models.Comment, { foreignKey: { name: 'userId' } })
    }

    return User
}