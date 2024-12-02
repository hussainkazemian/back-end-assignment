import express from 'express';
import { authenticateToken } from '../middlewares/authentication.js';
import {
  postUser,
  putUser,
  getUserById,
  getMe,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.post('/', postUser);
userRouter.put('/', authenticateToken, putUser);
userRouter.get('/', authenticateToken, getMe);
userRouter.get('/:id', authenticateToken, getUserById);

export default userRouter;
