const {schema, model} = require('mongoose');

const thoughtSchema = new schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // use getter method to format timestamp
        get: createdAtVal => dateFormat(createdAtVal)
    },

    username: {
        type: String,
        required: true,
        ref: 'User'
    },

    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },

    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

