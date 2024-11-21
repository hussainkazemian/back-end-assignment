import promisePool from '../utils/database.js';

/**
 * Update user information by user_id
 * @param {number} id User ID
 * @param {object} updatedData Object containing new values for `username` and `email`
 * @returns {Promise<number>} Number of affected rows
 */
const selectUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, user_level_id FROM Users WHERE user_id = ?',
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error('getUserById error', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const selectUserByUsernameAndPassword = async (username, password) => {
  try {
    // TODO: return only user_id?
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, user_level_id, created_at FROM Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserByUsernameAndPassword', error.message);
    throw new Error('Database error ' + error.message);
  }
};
const updateUserById = async (id, updatedData) => {
  const sql = `UPDATE Users SET username = ?, email = ? WHERE user_id = ?`;
  const params = [updatedData.username, updatedData.email, id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateUserById', error.message);
    throw new Error('Database error ' + error.message);
  }
};

export { selectUserByUsernameAndPassword, selectUserById, updateUserById };

