<<<<<<< HEAD
const express = require("express")
const { User } = require("../models/index")

const router = express.Router()

const accountIdCheck = false
const nicknameCheck = false
//signup api
router.route('/')
    .post(async (req, res) => {

        //const {accountId , nickname, password} = req.body
        if (accountIdCheck == true && nicknameCheck == true) {
            await Ad.create(req.body)
            return res.status(201)
        } return
        res.status(400).send({ errorMessage: " 아이디 혹은 닉네임 중복확인이 필요합니다. " })
    })

    .get(async (req, res) => {

        const { accountId } = req.query
        const { nickname } = req.query
        // id검사 하면 이곳 ...
        if (accountId) {
            //console.log(" account Id :", req.query.accountId)
            const accountExist = await User.findOne({ where: { accountId: req.query.accountId } })
            if (accountExist) {
                const isExist = true
                res.status(200).send({
                    isExist
                })
                return
            }
            const isExist = false
            accountIdCheck = true
            res.status(200).send({ isExist })
            return
            // nickname 검사 하면 이곳 ... 
        } else if (nickname) {
            //console.log(" nickname:", req.query.nickname)
            const nicknameExist = await User.findOne({ where: { nickname: req.query.nickname } })
            if (nicknameExist) {
                const isExist = true
                res.status(200).send({
                    isExist
                })
                return
            }
            const isExist = false
            nicknameCheck = true
            res.status(200).send({ isExist })
        }
    })

=======
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
        return res.status(201).json({})
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

>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
module.exports = router