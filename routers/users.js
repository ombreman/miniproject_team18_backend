const express = require("express")
const { User } = require("../models/index")
const router = express.Router()
//signup api
router.route('/')
    .post(async (req, res) => {
        await User.create({
            accountId: req.body.accountId,
            nickname: req.body.nickname,
            password: req.body.password
        })
        return res.status(201)
    })

    .get(async (req, res) => {

        const { accountId } = req.query
        const { nickname } = req.query
        // id검사 하면 이곳 ...
        if (accountId) {
            const accountCheck = await User.findOne({ where: { accountId: req.query.accountId } })
            if (accountCheck) {
                const accountExist = true
                res.status(200).send({
                    accountExist
                })
                return
            }
            const accountExist = false
            res.status(200).send({ accountExist })
            return
            // nickname 검사 하면 이곳 ... 
        } else if (nickname) {
            const nicknameCheck = await User.findOne({ where: { nickname: req.query.nickname } })
            if (nicknameCheck) {
                const nicknameExist = true
                res.status(200).send({
                    nicknameExist
                })
                return
            }
            const nicknameExist = false
            res.status(200).send({ nicknameExist })
        }
    })

module.exports = router