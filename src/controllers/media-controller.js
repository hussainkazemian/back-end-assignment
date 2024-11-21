import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  deleteMediaItem,
} from '../models/media-model.js';

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('getItemById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

/**
 * Add media controller function for handling POST request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const postItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  // quick and dirty validation example, better input validatation is added later
  if (!title || !description || !req.file) {
    return res
      .status(400)
      .json({message: 'Title, description and file required'});
  }
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    // user id read from token added by authentication middleware
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
    res.status(201).json({message: 'Item added', id: id});
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */

const putItem = async (req, res) => {
  const { title, description } = req.body;
  const newDetails = { title, description };
  const userRole = req.user.user_level_id;

  try {
    let itemsEdited = 0;

    if (userRole === 'admin') {
      // Admin can update any media item
      itemsEdited = await updateMediaItemAdmin(req.params.id, newDetails);
    } else {
      itemsEdited = await updateMediaItem(req.params.id, req.user.user_id, newDetails);
    }

    if (itemsEdited === 0) {
      return res.status(403).json({ message: 'Permission denied or item not found.' });
    }
    return res.status(200).json({ message: 'Item updated', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong: ' + error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemsDeleted = await deleteMediaItem(req.params.id, req.user.user_id);
    if (itemsDeleted === 0) {
      return res.status(403).json({ message: 'Permission denied or media item not found.' });
    } else {
      return res.status(200).json({ message: 'Item deleted', id: req.params.id });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong: ' + error.message });
  }
};

// Make sure to export deleteItem
export { getItems, getItemById, postItem, putItem, deleteItem };
