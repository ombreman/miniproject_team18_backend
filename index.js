const express = require("express")
const { User } = require("../models/index")
const hash = require('object-hash')

const router = express.Router({ mergeParams: true })

// Signup API
router.route("/users")
    .post((req, res) => {
        User.create({
            accountId: req.body.accountId,
            nickname: req.body.nickname,
            password: req.body.password
        })
        return res.status(201)
    })

// Login API
router.route("/login")
    .post(async (req, res) => {
        // 1. 받은 정보의 내용과 모두 일치하는 정보를 db에서 찾아낸다
        const userInfo = await User.findOne({ where: {
            accountId: req.body.accountId,
            password: hash(req.body.password)
        }})
        // 2. 일치하는 정보를 찾았으면 서버에서 토큰을 발행한다
        if (userInfo) {
            const token = jwt.sign({ userInfo: userInfo.accountId }, "my-secret-key", { expiresIn: '300s'})
            // 3. 발행한 토큰을 보내는 응답과 함께 보낸다
            res.send(token)
        }
    })