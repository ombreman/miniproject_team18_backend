const express = require("express")
const { Comment } = require("./../models/index")
const verifyToken = require("./../middleware/verifyToken")

const router = express.Router({ mergeParams: true })

// adId, userId, content
router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { adId: req.params.adId }})
        return res.status(200).json(comments)
    })

    .post(verifyToken, (req, res) => {
        Comment.create(req.body)
        return res.status(201).json({})
    })

router.route('/:commentId')
    .put(verifyToken, (req, res) => {
        Comment.update(req.body, { where: { id: req.params.commentId }})
        return res.status(204).json({})
    })

    .delete(verifyToken, (req, res) => {
        Comment.destroy({ where: { id: req.params.commentId }})
        return res.status(204).json({})
    })

module.exports = router