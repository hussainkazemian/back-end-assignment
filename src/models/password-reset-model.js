import promisePool from '../utils/database.js';

/**
 * Add a password reset request to the database
 * @param {object} resetData - Object containing `user_id`, `token`, and `expires_at`
 * @returns {Promise<number>} - ID of the inserted reset record
 */
const addPasswordReset = async (resetData) => {
  try {
    const sql = `
      INSERT INTO PasswordResets (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `;
    const params = [resetData.user_id, resetData.token, resetData.expires_at];
    const [result] = await promisePool.query(sql, params);
    console.log('Password reset token saved to database:', resetData.token); // Debugging
    return result.insertId;
  } catch (error) {
    console.error('addPasswordReset error:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const reset = await getPasswordResetByToken(token);
    if (!reset || reset.expires_at < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUserById(reset.user_id, { password: hashedPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('resetPassword error:', error.message);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};


/**
 * Fetch a password reset request by token
 * @param {string} token - Token string to search for
 * @returns {Promise<object|null>} - Password reset record or null if not found
 */
const getPasswordResetByToken = async (token) => {
  try {
    const sql = `
      SELECT * FROM PasswordResets
      WHERE token = ?
    `;
    const [rows] = await promisePool.query(sql, [token]);
    if (rows.length > 0) {
      console.log('Password reset token found in database:', token); // Debugging
    } else {
      console.log('No password reset token found for:', token); // Debugging
    }
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('getPasswordResetByToken error:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

/**
 * Remove expired password reset tokens (optional cleanup function)
 */
const deleteExpiredTokens = async () => {
  try {
    const sql = `
      DELETE FROM PasswordResets
      WHERE expires_at < NOW()
    `;
    const [result] = await promisePool.query(sql);
    console.log(`${result.affectedRows} expired tokens removed`); // Debugging
  } catch (error) {
    console.error('deleteExpiredTokens error:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

// Export the functions
export { addPasswordReset, getPasswordResetByToken, deleteExpiredTokens, resetPassword };
