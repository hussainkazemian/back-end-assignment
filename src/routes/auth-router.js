import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin, requestPasswordReset, resetPassword } from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {postUser} from '../controllers/user-controller.js';


const authRouter = express.Router();



authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);
// routes for /api/users/
authRouter.route('/register')
  .post(
    body('username').trim().isAlphanumeric().isLength({min: 3,
    max: 22}),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
    postUser,
  );

authRouter.post('/password-reset', requestPasswordReset);
authRouter.post('/password-reset/:token', resetPassword);
export default authRouter;
