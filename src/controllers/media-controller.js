import { validationResult, body } from 'express-validator';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  deleteMediaItem,
} from '../models/media-model.js';

const postMediaValidationRules = [
  body('title').isString().notEmpty().trim().escape().withMessage('Title is required'),
  body('description').isString().notEmpty().trim().escape().withMessage('Description is required'),
];

const getItems = async (req, res, next) => {
  try {
    const items = await fetchMediaItems();
    res.json(items);
  } catch (error) {
    next(error); // Use the next() to pass error to error handler middleware
  }
};

const getItemById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      const error = new Error('Item not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

const postItem = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  const { title, description } = req.body;
  const newMediaItem = {
    user_id: req.user.user_id,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };

  try {
    const id = await addMediaItem(newMediaItem);
    res.status(201).json({ message: 'Item added', id });
  } catch (error) {
    next(error);
  }
};

const putItem = async (req, res, next) => {
  const { title, description } = req.body;
  const newDetails = { title, description };
  const userRole = req.user.user_level_id;

  try {
    let itemsEdited = 0;

    if (userRole === 1) { // Assuming admin role is represented by user_level_id = 1
      itemsEdited = await updateMediaItem(req.params.id, null, newDetails);
    } else {
      itemsEdited = await updateMediaItem(req.params.id, req.user.user_id, newDetails);
    }

    if (itemsEdited === 0) {
      const error = new Error('Permission denied or item not found.');
      error.status = 403;
      return next(error);
    }
    res.status(200).json({ message: 'Item updated', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const itemsDeleted = await deleteMediaItem(req.params.id, req.user.user_id);
    if (itemsDeleted === 0) {
      const error = new Error('Permission denied or media item not found.');
      error.status = 403;
      return next(error);
    }
    res.status(200).json({ message: 'Item deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { getItems, getItemById, postItem, putItem, deleteItem, postMediaValidationRules };
