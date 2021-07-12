const express = require("express")
const { Ad } = require("./../models/index")

const router = express.Router()

// title, category, content, maxPeople, host
router.route('/')
    .get(async (req, res) => {
        const ads = req.query.category ? 
            await Ad.findAll({ where: { category: req.query.category }}) : await Ad.findAll()
        return res.status(200).json(ads)
    })

    .post((req, res) => {
        Ad.create(req.body)
        return res.status(201)
    })

router.route('/:adId')
    .get(async (req, res) => {
        const ad = await Ad.findByPk(req.params.adId)
        return res.status(200).json(ad)
    })

    .put((req, res) => {
        Ad.update(req.body, { where: { id: req.params.adId }})
        return res.status(204)
    })

    .delete((req, res) => {
        Ad.destroy({ where: { id: req.params.adId }})
        return res.status(204)
    })

module.exports = router