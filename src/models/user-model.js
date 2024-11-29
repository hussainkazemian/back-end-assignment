import promisePool from '../utils/database.js';

/**
 * Fetch a user by their email address
 * @param {string} email - The email address to search for
 * @returns {Promise<object|null>} - User record or null if not found
 */
const selectUserByEmail = async (email) => {
  try {
    const sql = `SELECT * FROM Users WHERE email = ?`;
    const [rows] = await promisePool.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('selectUserByEmail error:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

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

const selectUserByUsernameAndPassword = async (username) => {
  try {
    // TODO: return only user_id?
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, password FROM Users WHERE username = ?',
      
      [username],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserByUsernameAndPassword', error.message);
    throw new Error('Database error ' + error.message);
  }
};
const updateUserById = async (id, updatedData) => {
  // Check if only the password is being updated
  const columnsToUpdate = [];
  const values = [];

  if (updatedData.password) {
    columnsToUpdate.push('password = ?');
    values.push(updatedData.password);
  }

  if (columnsToUpdate.length === 0) {
    throw new Error('No valid fields to update');
  }

  const sql = `UPDATE Users SET ${columnsToUpdate.join(', ')} WHERE user_id = ?`;
  values.push(id);

  try {
    const [result] = await promisePool.query(sql, values);
    return result.affectedRows;
  } catch (error) {
    console.error('updateUserById error:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};


/**
* Creates a new user in the database
* 
* @param {object} user data
* @returns {number} - id of the inserted user in db
*/
const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)                 
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

export {selectUserByEmail, selectUserByUsernameAndPassword, selectUserById, updateUserById, addUser};

