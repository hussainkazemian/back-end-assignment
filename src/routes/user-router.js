import express from 'express';
import { authenticateToken } from '../middlewares/authentication.js';
import { putUser, getUserById} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Define the PUT endpoint for updating user information
userRouter.route('/').put(authenticateToken, putUser);


// Get user by ID
userRouter.route('/:id').get(authenticateToken, getUserById);

export default userRouter;
