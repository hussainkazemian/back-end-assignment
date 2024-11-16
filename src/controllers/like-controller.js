import {
  fetchLikesByMediaId,
  fetchLikesByUserId,
  addLike,
  removeLike,
} from '../models/like-model.js';

export const getLikesByMediaId = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    if (isNaN(mediaId)) {
      return res.status(400).json({ error: 'Invalid media ID' });
    }
    const likes = await fetchLikesByMediaId(mediaId);
    res.json(likes);
  } catch (error) {
    console.error('Error in getLikesByMediaId:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getLikesByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const likes = await fetchLikesByUserId(userId);
    res.json(likes);
  } catch (error) {
    console.error('Error in getLikesByUserId:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const postLike = async (req, res) => {
  try {
    const { user_id, media_id } = req.body;
    if (!user_id || !media_id) {
      return res
        .status(400)
        .json({ error: 'User ID and Media ID are required' });
    }
    if (isNaN(parseInt(user_id)) || isNaN(parseInt(media_id))) {
      return res.status(400).json({ error: 'User ID and Media ID must be numbers' });
    }
    await addLike({ user_id, media_id });
    res.status(201).json({ message: 'Like added' });
  } catch (error) {
    console.error('Error in postLike:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const likeId = parseInt(req.params.id);
    if (isNaN(likeId)) {
      return res.status(400).json({ error: 'Invalid like ID' });
    }
    await removeLike(likeId);
    res.json({ message: 'Like removed' });
  } catch (error) {
    console.error('Error in deleteLike:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};
