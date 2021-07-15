const jwt = require("jsonwebtoken")
const { User } = require("../models/index")

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const [ tokenType, tokenValue ] = (authorization || "").split(' ')

    if (!tokenType || (tokenType !== 'Bearer')) return res.redirect(401, "/login")  
    else {
        try {
            const accountId = jwt.verify(tokenValue, "my-secret-key")
            const user = User.findOne({ where: { accountId: accountId.userInfo }})

            if (!user) { 
                res.status(401).send({ error: '등록되지 않은 사용자입니다.' })
                return
            }
            else next()
        } 
        catch (error) {
            res.status(401).send({ error: '로그인 후 사용하세요.' })
            return
        }
    }
}