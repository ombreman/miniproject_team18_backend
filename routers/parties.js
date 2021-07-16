const express = require("express")
const { Party } = require("./../models/index")

const router = express.Router()

// adId, userId
router.route('/')
    .post((req, res, next) => {
        try{
            Party.create(req.body)
            return res.status(201).json({})
        } catch(err) {
            console.error(err)
            next()
        }
    })

    .delete((req, res) => {
        Party.destory(req.body)
        return res.status(204).json({})
    })

module.exports = router