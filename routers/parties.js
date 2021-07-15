const express = require("express")
const { Party } = require("./../models/index")

const router = express.Router({ mergeParams: true })

router.route('/')
    .post((req, res) => {
        Party.create(req.body)
        return res.status(201).json({})
    })

router.route('/:userId')
    .delete((req, res) => {
        Party.destroy({ where: req.params })
        return res.status(204).json({})
    })

module.exports = router