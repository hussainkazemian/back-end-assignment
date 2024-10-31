/**
 * Main application file for setting up the Express server.
 * @module app
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import mediaRoutes from './media.js'; // Update path as needed

// Define __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/**
 * Apply middleware for logging, JSON parsing, URL encoding, and cookie parsing.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Serve static media files from the /media folder.
 */
app.use('/media', express.static(path.join(__dirname, '../media')));

/**
 * Use media routes for the /api/media path.
 */
app.use('/api/media', mediaRoutes);

/**
 * Render the homepage.
 * @route GET /
 */
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Media API',
    message: 'Welcome to my REST API. This is a studnet user-centric-application-development project: ...',
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


/**
 * Error handler middleware.
 * @param {Object} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


/**
 * Start the server and listen on the specified port.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
