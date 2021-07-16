const express = require("express")
const { Comment } = require("./../models/index")

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { adId: req.params.adId } })
        return res.status(200).json(comments)
    })

    .post(async (req, res) => {
        const newComment = await Comment.create(req.body)
        return res.status(201).json(newComment)
    })

router.route('/:commentId')
    .put(async (req, res) => {
        const updatedComment = await Comment.update(req.body, { where: { id: req.params.commentId } })
        return res.status(200).json(updatedComment)
    })

    .delete(async (req, res) => {
        await Comment.destroy({ where: { id: req.params.commentId } })
        return res.status(204)
    })

module.exports = router