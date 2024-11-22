import express from 'express';
import { authenticateToken } from '../middlewares/authentication.js';
import { postUserValidationRules, putUserValidationRules, putUser, getUserById, postUser } from '../controllers/user-controller.js';

const userRouter = express.Router();

// Route for creating a new user
userRouter.route('/')
  .post(postUserValidationRules, postUser);

// Define the PUT endpoint for updating user information
userRouter.route('/')
  .put(authenticateToken, putUserValidationRules, putUser);

// Get user by ID
userRouter.route('/:id')
  .get(authenticateToken, getUserById);

export default userRouter;
