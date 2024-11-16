import {
  fetchCommentsByMediaId,
  fetchCommentById,
  addComment,
  updateComment,
  removeComment,
} from "../models/comment-model.js";

// Get all comments for a specific media item
export const getCommentsByMediaId = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    if (isNaN(mediaId)) {
      return res.status(400).json({ error: "Invalid media ID" });
    }
    const comments = await fetchCommentsByMediaId(mediaId);
    res.json(comments);
  } catch (error) {
    console.error("Error in getCommentsByMediaId:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

// Get a specific comment by its ID
export const getCommentById = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    if (isNaN(commentId)) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }
    const comment = await fetchCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error in getCommentById:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

// Add a new comment
export const postComment = async (req, res) => {
  try {
    const { media_id, user_id, comment_text } = req.body;
    if (!media_id || !user_id || !comment_text) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const commentId = await addComment({ media_id, user_id, comment_text });
    res.status(201).json({ message: "Comment added", comment_id: commentId });
  } catch (error) {
    console.error("Error in postComment:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

// Update a specific comment
export const updateCommentById = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const { comment_text } = req.body;
    if (isNaN(commentId) || !comment_text) {
      return res.status(400).json({ error: "Invalid input" });
    }
    await updateComment(commentId, { comment_text });
    res.json({ message: "Comment updated" });
  } catch (error) {
    console.error("Error in updateCommentById:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a specific comment
export const deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    if (isNaN(commentId)) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }
    await removeComment(commentId);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error in deleteComment:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};
