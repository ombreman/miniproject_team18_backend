const express = require("express")
const { User } = require("../models/index")
const router = express.Router()

router.route('/')
    .post(async (req, res) => {
        // req.body = { accountId, nickname, password }
        await User.create(req.body)
        return res.status(201).json({})
    })

    .get(async (req, res) => {
        // accountId 중복 확인
        if (req.query.accountId) {
            const accountCheck = await User.findOne({ where: { accountId: req.query.accountId }})
            return res.status(200).json(accountCheck ? true : false)
        }
        
        // nickname 중복 확인
        if (req.query.nickname) {
            const nicknameCheck = await User.findOne({ where: { nickname: req.query.nickname }})
            return res.status(200).json(nicknameCheck ? true : false)
        }
    })

module.exports = router