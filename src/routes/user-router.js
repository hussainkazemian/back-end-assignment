import express from 'express';
import multer from 'multer';
import {
  getItems,
  getItemById,
  postItem,
  updateItem,
  deleteItem,
} from '../controllers/media-controller.js';

// Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const mediaRouter = express.Router();

mediaRouter.route('/')
  .get(getItems)
  .post(upload.single('file'), postItem);

mediaRouter.route('/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

export default mediaRouter;
