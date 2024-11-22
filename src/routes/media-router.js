import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import 'dotenv/config';

import { getItemById, getItems, postItem, putItem, deleteItem } from '../controllers/media-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true); // accept file
    } else {
      cb(new Error('Only images and videos are allowed!'), false); // reject file with an error message
    }
  },
});

const mediaRouter = express.Router();

// Validation rules for media items
const mediaValidationRules = [
  body('title').notEmpty().withMessage('Title is required').trim().isLength({ min: 3, max: 50 }).withMessage('Title must be between 3 and 50 characters'),
  body('description').notEmpty().withMessage('Description is required').trim().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
];

// Route to add a new media item
mediaRouter.route('/')
  .post(authenticateToken, upload.single('file'), mediaValidationRules, postItem)
  .get(getItems);

// Route to handle operations on specific media items by ID
mediaRouter
  .route('/:id')
  .get(getItemById)
  .put(authenticateToken, mediaValidationRules, putItem)
  .delete(authenticateToken, deleteItem);

export default mediaRouter;
