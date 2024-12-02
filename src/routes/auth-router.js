import express from 'express';
import { body } from 'express-validator';
import { 
  getMe, 
  postLogin, 
  requestPasswordReset, 
  resetPassword, 
  register 
} from '../controllers/auth-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import handleValidationErrors from '../middlewares/handle-validation-errors.js';

const authRouter = express.Router();

/**
 * @api {post} /api/auth/register User Registration
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiDescription Register a new user account by providing a unique username, a valid email address, and a password.
 *
 * @apiBody {String} username User's unique username (alphanumeric, 3-22 characters).
 * @apiBody {String} password User's password (minimum 8 characters).
 * @apiBody {String} email User's email address.
 *
 * @apiExample {json} Request Example:
 * {
 *   "username": "newuser",
 *   "email": "newuser@example.com",
 *   "password": "securepassword123"
 * }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Registered user details.
 * @apiSuccess {Number} user.id ID of the registered user.
 * @apiSuccess {String} user.username Username of the registered user.
 * @apiSuccess {String} user.email Email of the registered user.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 201 Created
 * {
 *   "message": "User registered successfully.",
 *   "user": {
 *     "id": 26,
 *     "username": "newuser",
 *     "email": "newuser@example.com"
 *   }
 * }
 *
 * @apiError ValidationError Invalid input data.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Invalid email address."
 * }
 */
authRouter.post(
  '/register',
  body('username').trim().isAlphanumeric().isLength({ min: 3, max: 22 }).withMessage('Username must be 3-22 alphanumeric characters.'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  body('email').isEmail().withMessage('Invalid email address.'),
  handleValidationErrors,
  register
);

/**
 * @api {post} /api/auth/login User Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiDescription Authenticate a user by providing a valid username and password, and receive a JWT token for future requests.
 *
 * @apiBody {String} username User's unique username.
 * @apiBody {String} password User's password.
 *
 * @apiExample {json} Request Example:
 * {
 *   "username": "newuser",
 *   "password": "securepassword123"
 * }
 *
 * @apiSuccess {Number} user_id The ID of the authenticated user.
 * @apiSuccess {String} username The username of the authenticated user.
 * @apiSuccess {String} email The email of the authenticated user.
 * @apiSuccess {String} token JWT token for authentication.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "user_id": 26,
 *   "username": "newuser",
 *   "email": "newuser@example.com",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR..."
 * }
 *
 * @apiError InvalidCredentials Invalid username or password.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "message": "Invalid username or password"
 * }
 */
authRouter.post('/login', postLogin);

/**
 * @api {get} /api/auth/me Get Current User
 * @apiVersion 1.0.0
 * @apiName GetCurrentUser
 * @apiGroup Authentication
 * @apiPermission authenticated
 *
 * @apiDescription Retrieve the details of the currently authenticated user using a valid JWT token.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeaderExample {json} Header Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
 * }
 *
 * @apiSuccess {Number} user_id ID of the authenticated user.
 * @apiSuccess {String} username Username of the authenticated user.
 * @apiSuccess {String} email Email of the authenticated user.
 * @apiSuccess {Number} user_level_id User level ID of the authenticated user.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "user_id": 26,
 *   "username": "newuser",
 *   "email": "newuser@example.com",
 *   "user_level_id": 2
 * }
 *
 * @apiError InvalidToken Invalid or expired token.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 403 Forbidden
 * {
 *   "message": "Invalid token"
 * }
 */
authRouter.get('/me', authenticateToken, getMe);

/**
 * @api {post} /api/auth/password-reset Request Password Reset
 * @apiVersion 1.0.0
 * @apiName RequestPasswordReset
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiDescription Request a password reset link for the user by providing their registered email address.
 *
 * @apiBody {String} email User's email address.
 *
 * @apiExample {json} Request Example:
 * {
 *   "email": "user@example.com"
 * }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Password reset email sent"
 * }
 *
 * @apiError EmailNotFound No user found with the given email.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "User not found"
 * }
 */
authRouter.post(
  '/password-reset',
  body('email').isEmail().withMessage('Invalid email address.'),
  handleValidationErrors,
  requestPasswordReset
);

/**
 * @api {post} /api/auth/password-reset/:token Reset Password
 * @apiVersion 1.0.0
 * @apiName ResetPassword
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiDescription Reset a user's password using a valid reset token and a new password.
 *
 * @apiParam (URL) {String} token Password reset token.
 * @apiBody {String} password New password for the user (minimum 8 characters).
 *
 * @apiExample {json} Request Example:
 * {
 *   "password": "newsecurepassword"
 * }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Password has been reset successfully."
 * }
 *
 * @apiError InvalidToken Invalid or expired token.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Invalid or expired token"
 * }
 */
authRouter.post(
  '/password-reset/:token',
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  handleValidationErrors,
  resetPassword
);

export default authRouter;
