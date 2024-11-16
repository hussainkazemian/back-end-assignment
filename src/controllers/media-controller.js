import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  deleteMediaItem,
  deleteCommentsByMediaId,
  updateMediaItem,
} from "../models/media-model.js";

export const getItems = async (req, res) => {
  try {
    const items = await fetchMediaItems();
    res.json(items);
  } catch (e) {
    console.error("getItems", e.message);
    res.status(503).json({ error: 503, message: "DB error" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid media ID" });
    }
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (e) {
    console.error("getItemById", e.message);
    res.status(503).json({ error: "DB error" });
  }
};

export const postItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newMediaItem = {
      user_id: 1,
      title: req.body.title,
      description: req.body.description,
      filename: req.file.filename,
      filesize: req.file.size,
      media_type: req.file.mimetype,
      created_at: new Date().toISOString(),
    };

    const id = await addMediaItem(newMediaItem);

    if (!id) {
      return res.status(400).json({ message: "Something went wrong. Item not added" });
    }

    res.status(201).json({ message: "Item added", id });
  } catch (e) {
    console.error("postItem", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Delete dependent comments
    await deleteCommentsByMediaId(id);

    // Delete the media item
    const result = await deleteMediaItem(id);

    if (!result) {
      return res.status(404).json({ message: "Media item not found" });
    }

    res.json({ message: "Media item deleted" });
  } catch (e) {
    console.error("deleteItem", e.message);
    res.status(503).json({ error: "DB error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: "Invalid media ID" });
    }

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
    };

    // Validate required fields
    if (!updatedData.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Update the media item
    const result = await updateMediaItem(id, updatedData);

    if (!result) {
      return res.status(404).json({ message: "Media item not found" });
    }

    res.json({ message: "Media item updated" });
  } catch (e) {
    console.error("updateItem", e.message);
    res.status(503).json({ error: "DB error" });
  }
};
