import promisePool from '../utils/database.js';

export const fetchLikesByMediaId = async (media_id) => {
  const sql = 'SELECT * FROM Likes WHERE media_id = ?';
  const [rows] = await promisePool.query(sql, [media_id]);
  return rows;
};

export const fetchLikesByUserId = async (user_id) => {
  const sql = 'SELECT * FROM Likes WHERE user_id = ?';
  const [rows] = await promisePool.query(sql, [user_id]);
  return rows;
};

export const addLike = async ({ user_id, media_id }) => {
  const sql = 'INSERT INTO Likes (user_id, media_id) VALUES (?, ?)';
  await promisePool.query(sql, [user_id, media_id]);
};

export const removeLike = async (like_id) => {
  const sql = 'DELETE FROM Likes WHERE like_id = ?';
  await promisePool.query(sql, [like_id]);
};
