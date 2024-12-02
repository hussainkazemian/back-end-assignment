import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import mediaRouter from './routes/media-router.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handler.js';

const app = express();
const port = 3000;

// Adjust Helmet configuration to allow unsafe-eval in local development
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'"], // Allow 'unsafe-eval'
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Apply other middlewares
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Set up views for pug rendering (if used)
app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Mount API routes
app.use('/api/users', userRouter); // User routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/media', mediaRouter); // Media routes

// Serve API documentation
// Using path.resolve() to handle the correct path in ES6 modules
app.use('/docs', express.static(path.resolve('docs')));

// Handle undefined routes (404 errors)
app.use(notFoundHandler); // Middleware for 404 errors

// Centralized error handler
app.use(errorHandler); // Middleware for handling application errors

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Docs available at http://localhost:${port}/docs`);
});
