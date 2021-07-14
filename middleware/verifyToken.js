const jwt = require("jsonwebtoken")
const User = require("../models/users")

module.exports = (req, res, next) => {
    const { authorization } = req.headers // client에서 입력한 것이 어떤 형태로 서버에게 전달되는지 확인 필요
    const [ tokenType, tokenValue ] = authorization.split(' ')

    if (tokenType !== 'Bearer') { // token type을 활용해 정상적인 token인지 확인한다.
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        })
        // 로그인 화면으로 되돌려 보낸다.
        return res.redirect(302, "/login")
    }

    try {
        const { accountId } = jwt.verify(tokenValue, "my-secret-key") // 유효한 토큰인지 확인한다.
        //if (user 가 DB에 없을 경우) 예외처리 필요
        const user = User.findOne({ accountId })
        if (!user) { // 탈퇴한 사용자거나 차단된 사용자는 에러처리
            res.status(401).send({
                errorMessage: '등록되지 않은 사용자입니다.'
            })
            return
        }
        User.findOne({ accountId} )
            .then(( user ) => {
                res.locals.user = user // 일치하는 사용자 정보를 db에서 불러와 locals.user에 담아둔다.
                next()
            })
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        })
        return
    }
    next()
}