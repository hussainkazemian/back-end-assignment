import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { selectUserById, selectUserByUsernameAndPassword, updateUserById, selectUserByEmail } from '../models/user-model.js';
import { addPasswordReset, getPasswordResetByToken } from '../models/password-reset-model.js';
import { sendEmail } from '../utils/email.js';
import 'dotenv/config';

// Login Functionality
const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await selectUserByUsernameAndPassword(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Remove sensitive data before sending the response
    delete user.password;

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });

    res.json({ ...user, token });
  } catch (error) {
    console.error('postLogin error:', error.message);
    next(error); // Pass to error-handling middleware
  }
};

// Get Current User Info
const getMe = async (req, res, next) => {
  try {
    const user = await selectUserById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user_id: req.user.user_id, ...user });
  } catch (error) {
    console.error('getMe error:', error.message);
    next(error);
  }
};

// Request Password Reset
const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await selectUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // Valid for 1 hour
    await addPasswordReset({ user_id: user.user_id, token, expires_at: expiresAt });

    // Send reset token via email
    await sendEmail(email, 'Password Reset', `Your password reset token is: ${token}`);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('requestPasswordReset error:', error.message);
    res.status(500).json({ message: 'Failed to process password reset' });
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const reset = await getPasswordResetByToken(token);
    if (!reset || reset.expires_at < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await updateUserById(reset.user_id, { password: hashedPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('resetPassword error:', error.message);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

export { postLogin, getMe, requestPasswordReset, resetPassword };
