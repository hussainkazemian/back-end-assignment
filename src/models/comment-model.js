import promisePool from "../utils/database.js";

// Fetch all comments for a specific media item
export const fetchCommentsByMediaId = async (mediaId) => {
  const sql = `SELECT * FROM comments WHERE media_id = ?`;
  const [comments] = await promisePool.query(sql, [mediaId]);
  return comments;
};

// Fetch a specific comment by its ID
export const fetchCommentById = async (commentId) => {
  const sql = `SELECT * FROM comments WHERE comment_id = ?`;
  const [rows] = await promisePool.query(sql, [commentId]);
  return rows[0];
};

// Add a new comment
export const addComment = async ({ media_id, user_id, comment_text }) => {
  const sql = `INSERT INTO comments (media_id, user_id, comment_text) VALUES (?, ?, ?)`;
  const [result] = await promisePool.query(sql, [media_id, user_id, comment_text]);
  return result.insertId;
};

// Update an existing comment
export const updateComment = async (commentId, { comment_text }) => {
  const sql = `UPDATE comments SET comment_text = ? WHERE comment_id = ?`;
  await promisePool.query(sql, [comment_text, commentId]);
};

// Remove a comment
export const removeComment = async (commentId) => {
  const sql = `DELETE FROM comments WHERE comment_id = ?`;
  await promisePool.query(sql, [commentId]);
};
