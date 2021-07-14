const express = require("express")
const { Party } = require("./../models/index")

const router = express.Router({ mergeParams: true })

// userId, adId
router.route('/')
    .post((req, res) => {
        Party.create(req.body)
        return res.status(201)
    })

    .delete((req, res) => {
        Party.destory(req.body)
        return res.status(204)
    })

// instead of using two separte  app.post and app.delete => put everything inside one route
module.exports = router