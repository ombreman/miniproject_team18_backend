const express = require("express")
const { Comment, User, Ad } = require("./../models/index")
const verifyToken = require("./../middleware/verifyToken")

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { adId: req.params.adId }})
        return res.status(200).json(comments)
    })

    .post(verifyToken, async (req, res) => {
        const comment = await Comment.create({ content: req.body.content })
        const user = await User.findByPk(req.body.userId)
        const ad = await Ad.findByPk(req.body.adId)
        user.addComment(comment)
        ad.addComment(comment)
        return res.status(201).json({})
    })

router.route('/:commentId')
    .put(verifyToken, (req, res) => {
        // req.body = { content, ... }
        Comment.update(req.body, { where: { id: req.params.commentId }})
        return res.status(204).json({})
    })

    .delete(verifyToken, (req, res) => {
        Comment.destroy({ where: { id: req.params.commentId }})
        return res.status(204).json({})
    })

module.exports = router