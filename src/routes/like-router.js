import express from "express";
import {
  getLikesByMediaId,
  getLikesByUserId,
  postLike,
  deleteLike,
} from "../controllers/like-controller.js";

const likeRouter = express.Router();

// Get likes for a specific media
likeRouter.get("/media/:id", getLikesByMediaId);

// Get likes by a specific user
likeRouter.get("/user/:id", getLikesByUserId);

// Add a like
likeRouter.post("/", postLike);

// Remove a like
likeRouter.delete("/:id", deleteLike);

export default likeRouter;
