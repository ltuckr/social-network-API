const { Thought, Reaction } = require('../models');

const ReactionController = {
    addReaction: ({params, body}, res) => {
        console.log("Inside addReaction");
        console.log("Request Body:", body);

        Reaction.create(body)
        .then(({_id}) => {
            console.log("New Reaction ID:", _id);
            return Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$push: {reactions: _id}},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            console.log("Updated Thought:", dbThoughtData);
            if (!dbThoughtData) {
                console.log("No thought found with this id!");
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            console.log("Reaction added successfully!");
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.error("Error:", err);
            res.json(err);
        });
    },

    removeReaction: ({params}, res) => {
        console.log("Inside removeReaction");

        Reaction.findOneAndDelete({_id: params.reactionId})
        .then(deletedReaction => {
            console.log("Deleted Reaction:", deletedReaction);
            if (!deletedReaction) {
                console.log("No reaction found with this id!");
                return res.status(404).json({message: 'No reaction found with this id!'});
            }
            return Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: params.reactionId}},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            console.log("Updated Thought:", dbThoughtData);
            if (!dbThoughtData) {
                console.log("No thought found with this id!");
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            console.log("Reaction removed successfully!");
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.error("Error:", err);
            res.json(err);
        });
    }
};

module.exports = ReactionController;
