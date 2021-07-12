const express = require("express")
const { Comment } = require("./../models/index")

const router = express.Router({ mergeParams: true })

// userId, content, adId
router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { adId: req.params.adId }})
        return res.status(200).json(comments)
    })

    .post((req, res) => {
        Comment.create(req.body)
        return res.status(201)
    })

router.route('/:commentId')
    .put((req, res) => {
        Comment.update(req.body, { where: { id: req.params.commentId }})
        return res.status(204)
    })

    .delete((req, res) => {
        Comment.destroy({ where: { id: req.params.commentId }})
        return res.status(204)
    })

module.exports = router