import promisePool from '../utils/database.js';
import bcrypt from 'bcryptjs';

/**
 * Create a new user
 */
export const postUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO Users (username, email, password, user_level_id) VALUES (?, ?, ?, 2)`;
    const [result] = await promisePool.query(sql, [username, email, hashedPassword]);

    res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: result.insertId,
        username,
        email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

/**
 * Update user information
 */
export const putUser = async (req, res) => {
  const { username, email, password } = req.body;
  const { user_id } = req.user;

  try {
    const updates = [];
    const params = [];

    if (username) {
      updates.push('username = ?');
      params.push(username);
    }

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      params.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    params.push(user_id);
    const sql = `UPDATE Users SET ${updates.join(', ')} WHERE user_id = ?`;
    const [result] = await promisePool.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `SELECT user_id, username, email, user_level_id FROM Users WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

/**
 * Retrieve the current authenticated user
 */
export const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const sql = `SELECT user_id, username, email, user_level_id FROM Users WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error retrieving current user:', error.message);
    res.status(500).json({ message: 'Failed to retrieve user information' });
  }
};
