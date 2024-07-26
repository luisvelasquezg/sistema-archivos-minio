/**
 * Module dependencies.
 */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const apiRoutes = require('./config/main.routes');

/**
 * Create Express app.
 */

const app = express();
const port = process.env.PORT || 3000;

/**
 * Enable Cross-Origin Resource Sharing (CORS).
 */

app.use(cors());

/**
 * Enable HTTP request logging.
 */

app.use(morgan('dev'));

/**
 * Parse JSON request bodies.
 */

app.use(express.json());

/**
 * Parse URL-encoded request bodies.
 */

app.use(express.urlencoded({ extended: false }));

/**
 * Connect to the database.
 */

connectDB();

/**
 * Configure API routes.
 */

apiRoutes(app);

/**
 * Serve static files from the 'public' directory.
 */

app.use(express.static('../front/angularjs'));

/**
 * Start the server.
 */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/**
 * Export the Express app.
 */

module.exports = app;