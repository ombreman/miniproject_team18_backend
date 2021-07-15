const express = require("express")
const { Ad, User, Party } = require("./../models/index")
const verifyToken = require("./../middleware/verifyToken")

const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        if (req.query.category) {
            const ads = await Ad.findAll({ where: { category: req.query.category },
                include: [{
                    model: User,
                    as: 'UsersInAd',
                    attributes: ['nickname']
                }] 
            })
            return res.status(200).json(ads)
        }
        else {
            const ads = await Ad.findAll({ 
                include: [{
                    model: User,
                    as: 'UsersInAd',
                    attributes: ['nickname']
                }]
            })
            return res.status(200).json(ads)
        }
    })

    .post(verifyToken, async (req, res) => {
        const host = await User.findOne({ where: { nickname: req.body.host }}) 
        // req.body = { host, title, category, content, maxPeople }
        const newAd = await Ad.create(req.body)
        Party.create({
            adId: newAd.id,
            userId: host.id
        })
        return res.status(201).send("send")
    })

router.route('/:adId')
    .get(async (req, res) => {
        const ad = await Ad.findByPk(req.params.adId, { 
            include: [{
                model: User,
                as: 'UsersInAd',
                attributes: ['nickname']
            }]
        })
        return res.status(200).json(ad)
    })

    .put(verifyToken, (req, res) => {
        Ad.update(req.body, { where: { id: req.params.adId }})
        return res.status(204).json({})
    })

    .delete(verifyToken, (req, res) => {
        Ad.destroy({ where: { id: req.params.adId }})
        return res.status(204).json({})
    })

module.exports = router