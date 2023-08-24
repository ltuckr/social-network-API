const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormatter');

// Define the reactionSchema separately
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define thoughtSchema using reactionSchema as a sub-document
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: [reactionSchema] 
    // Use reactionSchema as a sub-document
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Define and export the Thought model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
