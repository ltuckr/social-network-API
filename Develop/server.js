// server.js
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', routes);

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
