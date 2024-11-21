import express from 'express';
import multer from 'multer';
import {getItemById, getItems, postItem, putItem, deleteItem} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

mediaRouter.route('/')
  .get(getItems)
  .post(authenticateToken, upload.single('file'), postItem);

mediaRouter
  .route('/:id')
  .get(getItemById)
  .put(authenticateToken, putItem)
  .delete(authenticateToken, deleteItem);

export default mediaRouter;
