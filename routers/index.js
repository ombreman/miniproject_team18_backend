const express = require("express")
const { User } = require("../models/index")
const hash = require('object-hash')
const jwt = require('./../utils/jwt')

const router = express.Router({ mergeParams: true })

router.route("/login")
    .post(async (req, res) => {
        const userInfo = await User.findOne({ where: {
            accountId: req.body.accountId,
            password: hash(req.body.password)
        }})

        if (userInfo) {
            return res.status(200).send({
                token: jwt(userInfo.accountId),
                user: userInfo
            })
        }
    })

module.exports = router