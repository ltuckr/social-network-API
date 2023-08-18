const {schema, model, Types} = require('mongoose');

const UserSchema = new schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: 'Email is required',
            match: [/.+@.+\..+/]
        },

        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {