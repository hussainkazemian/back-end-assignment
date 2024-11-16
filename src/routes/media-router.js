import express from "express";
import multer from "multer";
import {
  getItemById,
  getItems,
  postItem,
  deleteItem,
  updateItem,
} from "../controllers/media-controller.js";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Add unique prefix to filename
  },
});

const upload = multer({ storage });

const mediaRouter = express.Router();

// Route for listing all items and adding a new item
mediaRouter
  .route("/")
  .get(getItems) // GET all media items
  .post(upload.single("file"), postItem); // POST to upload a media item

// Routes for single item operations: GET, PUT, DELETE
mediaRouter
  .route("/:id")
  .get(getItemById) // GET a single media item by ID
  .put(updateItem) // PUT to update a media item by ID
  .delete(deleteItem); // DELETE a media item by ID

export default mediaRouter;
