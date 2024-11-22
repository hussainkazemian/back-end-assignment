import express from 'express';
import mediaRouter from './routes/media-router.js';
import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handler.js'; // Import error handlers

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/uploads', express.static('uploads'));

// Api documentation page rendered with pug
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Media sharing REST API Documentation',
    version: process.env.npm_package_version,
    // exampleData: mediaItems,
  });
});

// User authentication endpoints
app.use('/api/auth', authRouter);
// Media resource endpoints
app.use('/api/media', mediaRouter);

app.use('/api/users', userRouter);
// User resource endpoints
//app.use('/api/users', userRouter);
app.use('/api/users', userRouter); 
// not found handler for all other routes
app.use(notFoundHandler);
// custom error handler as the last middleware
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
