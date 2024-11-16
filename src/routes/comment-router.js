import express from "express";
import {
  getCommentsByMediaId,
  getCommentById,
  postComment,
  updateCommentById,
  deleteComment,
} from "../controllers/comment-controller.js";

const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(postComment); // Add a comment

commentRouter
  .route("/media/:id")
  .get(getCommentsByMediaId); // Get all comments for a specific media item

commentRouter
  .route("/:id")
  .get(getCommentById) // Get a specific comment
  .put(updateCommentById) // Update a specific comment
  .delete(deleteComment); // Delete a specific comment

export default commentRouter;
