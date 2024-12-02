import promisePool from '../utils/database.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/email.js';

/**
 * Add a password reset request to the database
 */
export const addPasswordReset = async (resetData) => {
  try {
    const sql = `
      INSERT INTO PasswordResets (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `;
    const params = [resetData.user_id, resetData.token, resetData.expires_at];
    const [result] = await promisePool.query(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('Error adding password reset:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

/**
 * Fetch a password reset request by token
 */
export const getPasswordResetByToken = async (token) => {
  try {
    const sql = `SELECT * FROM PasswordResets WHERE token = ?`;
    const [rows] = await promisePool.query(sql, [token]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching password reset by token:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

/**
 * Delete expired password reset tokens
 */
export const deleteExpiredTokens = async () => {
  try {
    const sql = `DELETE FROM PasswordResets WHERE expires_at < NOW()`;
    const [result] = await promisePool.query(sql);
    console.log(`Deleted ${result.affectedRows} expired tokens`);
  } catch (error) {
    console.error('Error deleting expired tokens:', error.message);
    throw new Error('Database error: ' + error.message);
  }
};

/**
 * Reset a user's password
 */
export const resetPassword = async (req, res, next) => {
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
    const sql = `UPDATE Users SET password = ? WHERE user_id = ?`;
    await promisePool.query(sql, [hashedPassword, reset.user_id]);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    next(error);
  }
};
