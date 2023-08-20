const router = require('express').Router();

const {
    getAllReactions,
    getReactionById,
    createReaction,
    updateReaction,
    deleteReaction,
} = require('../../controllers/reaction-controller');

// get all reactions, create reaction
router.route('/').get(getAllReactions).post(createReaction);

// get reaction by ID, update reaction, delete reaction
router.route('/:id').get(getReactionById).put(updateReaction).delete(deleteReaction);

module.exports = router;
