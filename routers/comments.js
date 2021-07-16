const express = require("express")
const { Comment } = require("./../models/index")
<<<<<<< HEAD
=======
const verifyToken = require("./../middleware/verifyToken")
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66

const router = express.Router({ mergeParams: true })

// adId, userId, content
router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { adId: req.params.adId } })
        return res.status(200).json(comments)
    })

    .post(verifyToken, (req, res) => {
        Comment.create(req.body)
        return res.status(201).json({})
    })

router.route('/:commentId')
<<<<<<< HEAD
    .put(async (req, res) => {
        const updatedComment = await Comment.update(req.body, { where: { id: req.params.commentId } })
        return res.status(200).json(updatedComment)
    })

    .delete(async (req, res) => {
        await Comment.destroy({ where: { id: req.params.commentId } })
        return res.status(204)
=======
    .put(verifyToken, (req, res) => {
        Comment.update(req.body, { where: { id: req.params.commentId }})
        return res.status(204).json({})
    })

    .delete(verifyToken, (req, res) => {
        Comment.destroy({ where: { id: req.params.commentId }})
        return res.status(204).json({})
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
    })

module.exports = router