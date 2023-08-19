const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
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
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp
            get: createdAtVal => dateFormat(createdAtVal)
        }

    },
    {
        toJSON: {   // allow virtuals
            getters: true
        },
        id: false

    });

module.exports = reactionSchema;