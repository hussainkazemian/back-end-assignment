import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import 'dotenv/config';
import {
  getItemById,
  getItems,
  postItem,
  putItem,
  deleteItem
} from '../controllers/media-controller.js';

import { authenticateToken } from '../middlewares/authentication.js';

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true); // accept file
    } else {
      cb(new Error('Only images and videos are allowed!'), false); // reject file with an error message
    }
  },
});

const mediaRouter = express.Router();

// Validation rules for media items
const mediaValidationRules = [
  body('title').notEmpty().withMessage('Title is required').trim().isLength({ min: 3, max: 50 }).withMessage('Title must be between 3 and 50 characters'),
  body('description').notEmpty().withMessage('Description is required').trim().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
];

/**
 * @api {post} /api/media Add New Media
 * @apiVersion 1.0.0
 * @apiName AddMedia
 * @apiGroup Media
 * @apiPermission authenticated
 *
 * @apiDescription Add a new media entry with title, description, and an uploaded file. Only authenticated users can add media.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeaderExample {json} Header Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
 * }
 *
 * @apiBody {String} title The title of the media (3-50 characters).
 * @apiBody {String} description The description of the media (max 255 characters).
 * @apiBody {File} file The media file to be uploaded (image/video).
 *
 * @apiParamExample {json} Request Example:
 * {
 *   "title": "My Vacation Video",
 *   "description": "A video from my recent vacation"
 * }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id The ID of the newly created media.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 201 Created
 * {
 *   "message": "Item added",
 *   "id": 1
 * }
 *
 * @apiError ValidationError Invalid input data or file missing.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Invalid or missing fields"
 * }
 */
mediaRouter.route('/')
  .post(authenticateToken, upload.single('file'), mediaValidationRules, postItem)
  .get(getItems);

/**
 * @api {get} /api/media Get All Media
 * @apiVersion 1.0.0
 * @apiName GetAllMedia
 * @apiGroup Media
 * @apiPermission public
 *
 * @apiDescription Retrieve all media items available.
 *
 * @apiSuccess {Object[]} media Array of media items.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "title": "My Vacation Video",
 *     "description": "A video from my recent vacation",
 *     "filename": "vacation-video.mp4",
 *     "filesize": 1050000,
 *     "media_type": "video/mp4",
 *     "created_at": "2023-10-21T10:20:30Z"
 *   }
 * ]
 */
mediaRouter.route('/')
  .get(getItems);

/**
 * @api {get} /api/media/:id Get Media by ID
 * @apiVersion 1.0.0
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiPermission public
 *
 * @apiDescription Retrieve a media item by its ID.
 *
 * @apiParam {Number} id The ID of the media item.
 *
 * @apiSuccess {Object} media The requested media item.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "title": "My Vacation Video",
 *   "description": "A video from my recent vacation",
 *   "filename": "vacation-video.mp4",
 *   "filesize": 1050000,
 *   "media_type": "video/mp4",
 *   "created_at": "2023-10-21T10:20:30Z"
 * }
 *
 * @apiError MediaNotFound The media item with the given ID was not found.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "Item not found"
 * }
 */
mediaRouter.route('/:id')
  .get(getItemById);

/**
 * @api {put} /api/media/:id Update Media
 * @apiVersion 1.0.0
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiPermission authenticated
 *
 * @apiDescription Update a media entry by its ID. Only authenticated users can update media they own.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeaderExample {json} Header Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
 * }
 *
 * @apiParam {Number} id The ID of the media item.
 *
 * @apiBody {String} title The updated title of the media (optional).
 * @apiBody {String} description The updated description of the media (optional).
 *
 * @apiParamExample {json} Request Example:
 * {
 *   "title": "Updated Title",
 *   "description": "Updated Description"
 * }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id The ID of the updated media.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Item updated",
 *   "id": 1
 * }
 *
 * @apiError PermissionDenied User does not have permission to update the media.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 403 Forbidden
 * {
 *   "message": "Permission denied or item not found."
 * }
 */
mediaRouter
  .route('/:id')
  .put(authenticateToken, mediaValidationRules, putItem);

/**
 * @api {delete} /api/media/:id Delete Media
 * @apiVersion 1.0.0
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission authenticated
 *
 * @apiDescription Delete a media item by its ID. Only authenticated users can delete media they own.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeaderExample {json} Header Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
 * }
 *
 * @apiParam {Number} id The ID of the media item.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id The ID of the deleted media.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Item deleted",
 *   "id": 1
 * }
 *
 * @apiError PermissionDenied User does not have permission to delete the media.
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 403 Forbidden
 * {
 *   "message": "Permission denied or media item not found."
 * }
 */
mediaRouter
  .route('/:id')
  .delete(authenticateToken, deleteItem);

export default mediaRouter;
