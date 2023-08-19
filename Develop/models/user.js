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
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    });

// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;