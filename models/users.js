const hash = require('object-hash');

module.exports = function( sequelize, DataTypes) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        userId: {
            type: DataTypes.STRING(20), // 글자수 제한
            unique: true, // 중복 방지
            allowNull: false // 띄어쓰기 불가
        },
        nickname: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', hash(value));
            }
            // allowNull defaults to true
        }
    }, {
        // Other model options go here
        timestamps: true
    });
    return User
};