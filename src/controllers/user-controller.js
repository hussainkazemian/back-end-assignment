import { updateUserById, selectUserById, addUser } from '../models/user-model.js';
import { validationResult, body } from 'express-validator';

// Validation rules for adding a new user
const postUserValidationRules = [
  body('username').isString().isLength({ min: 3 }).trim().escape().withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation rules for updating user info
const putUserValidationRules = [
  body('username').optional().isString().trim().escape().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Invalid email address'),
];

const putUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  const { username, email } = req.body;
  try {
    const updatedUser = await updateUserById(req.user.user_id, { username, email });

    if (updatedUser === 0) {
      const error = new Error('Cannot update user information.');
      error.status = 403;
      return next(error);
    }

    return res.status(200).json({ message: 'User information updated' });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await selectUserById(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  try {
    const newUserId = await addUser(req.body);
    res.status(201).json({ message: 'New user added', user_id: newUserId });
  } catch (error) {
    next(error);
  }
};

export { getUserById, putUser, postUser, postUserValidationRules, putUserValidationRules };
