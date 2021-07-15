const jwt = require('jsonwebtoken')

module.exports = accountId => {
    return jwt.sign({ userInfo: accountId }, "my-secret-key", { expiresIn: '300s' })
}