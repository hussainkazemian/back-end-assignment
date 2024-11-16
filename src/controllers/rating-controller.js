import {
  fetchRatingsByMediaId,
  addRating,
  modifyRating,
  removeRating,
} from "../models/rating-model.js";

export const getRatingsByMediaId = async (req, res) => {
  try {
    const ratings = await fetchRatingsByMediaId(req.params.id);
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const postRating = async (req, res) => {
  try {
    const { media_id, user_id, rating } = req.body;

    // Validate input
    if (!media_id || !user_id || !rating) {
      return res
        .status(400)
        .json({ error: "Media ID, User ID, and Rating are required" });
    }

    if (isNaN(parseInt(media_id)) || isNaN(parseInt(user_id)) || isNaN(parseFloat(rating))) {
      return res.status(400).json({ error: "Invalid data provided" });
    }

    // Ensure rating is converted to a valid number
    const ratingValue = parseFloat(rating);

    // Add rating to the database
    const ratingId = await addRating({ media_id, user_id, rating_value: ratingValue });

    // Respond with success
    res.status(201).json({ message: "Rating added", rating_id: ratingId });
  } catch (error) {
    console.error("Error in postRating:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

export const updateRating = async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);
    const { rating } = req.body;

    // Validate input
    if (!ratingId || isNaN(ratingId)) {
      return res.status(400).json({ error: "Invalid rating ID" });
    }
    if (!rating || isNaN(parseFloat(rating))) {
      return res.status(400).json({ error: "Valid rating is required" });
    }

    const ratingValue = parseFloat(rating);

    // Update the rating in the database
    const updated = await modifyRating(ratingId, ratingValue);
    if (updated) {
      res.json({ message: "Rating updated" });
    } else {
      res.status(404).json({ error: "Rating not found" });
    }
  } catch (error) {
    console.error("Error in updateRating:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};
export const deleteRating = async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);

    // Validate input
    if (!ratingId || isNaN(ratingId)) {
      return res.status(400).json({ error: "Invalid rating ID" });
    }

    // Delete the rating from the database
    const deleted = await removeRating(ratingId);
    if (deleted) {
      res.json({ message: "Rating deleted" });
    } else {
      res.status(404).json({ error: "Rating not found" });
    }
  } catch (error) {
    console.error("Error in deleteRating:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};