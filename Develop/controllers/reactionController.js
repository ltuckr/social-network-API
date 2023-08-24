const { Reaction } = require('../models');

const ReactionController = {
    getAllReactions: (req, res) => {
        // Implementation to get all reactions
    },

    getReactionById: (req, res) => {
        // Implementation to get a specific reaction by ID
    },

    createReaction: (req, res) => {
        const { body } = req;
        console.log("Inside createReaction");
        console.log("Request Body:", body);

        Reaction.create(body)
        .then(newReaction => {
            console.log("New Reaction:", newReaction);
            console.log("Reaction added successfully!");
            res.json(newReaction);
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json(err);
        });
    },

    updateReaction: (req, res) => {
        // Implementation to update a reaction by ID
    },

    deleteReaction: (req, res) => {
        const { reactionId } = req.params;
        console.log("Inside deleteReaction");

        Reaction.findOneAndDelete({ _id: reactionId })
        .then(deletedReaction => {
            console.log("Deleted Reaction:", deletedReaction);
            if (!deletedReaction) {
                console.log("No reaction found with this id!");
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }
            console.log("Reaction removed successfully!");
            res.json(deletedReaction);
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json(err);
        });
    }
};

module.exports = ReactionController;
