const { connect, default: mongoose } = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the deprecated options
  }
);

mongoose.set('debug', true);

module.exports = mongoose.connection;
