const { Thought} = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
            // if no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({message: 'Oops! No thought found with this id.'});
                return;
            }
            // otherwise, send the data
            res.json(dbThoughtData);
        })                   
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create thought
    createThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'Oops! No thought found with this id.'});
            return;
        }
        res.json(dbThoughtData);
    })          
    .catch(err => res.json(err));
    },

    // delete thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Oops! No thought found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })          
        .catch(err => res.json(err));
    },

    // add reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Oops! No thought found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })          
        .catch(err => res.json(err));
    },

    // delete reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
  

