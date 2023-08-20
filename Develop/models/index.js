const models = require('./models');

const User = models.User;
const Thought = models.Thought;
const Reaction = models.Reaction;

//destructure to get the models directly
const { User, Thought, Reaction } = require('./models');
