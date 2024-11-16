import express from "express";
import {
  getRatingsByMediaId,
  postRating,
  updateRating,
  deleteRating,
} from "../controllers/rating-controller.js";

const ratingRouter = express.Router();

// Get ratings for a specific media item
ratingRouter.get("/media/:id", getRatingsByMediaId);

// Add a new rating
ratingRouter.post("/", postRating);

// Update a rating
ratingRouter.put("/:id", updateRating);

// Delete a rating
ratingRouter.delete("/:id", deleteRating);

export default ratingRouter;
