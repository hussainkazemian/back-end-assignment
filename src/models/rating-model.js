import promisePool from "../utils/database.js";

// Fetch ratings by media ID
export const fetchRatingsByMediaId = async (media_id) => {
  const sql = `SELECT * FROM Ratings WHERE media_id = ?`;
  const [rows] = await promisePool.query(sql, [media_id]);
  return rows;
};

// Add a new rating
export const addRating = async ({ media_id, user_id, rating_value }) => {
  const sql = `
    INSERT INTO Ratings (media_id, user_id, rating_value)
    VALUES (?, ?, ?)
  `;
  const params = [media_id, user_id, rating_value];

  try {
    const [result] = await promisePool.query(sql, params);
    return result.insertId; // Return the new rating ID
  } catch (error) {
    console.error("Error in addRating:", error.message);
    throw error;
  }
};

// Update an existing rating
export const modifyRating = async (ratingId, ratingValue) => {
  const sql = `
    UPDATE Ratings
    SET rating_value = ?
    WHERE rating_id = ?
  `;
  const params = [ratingValue, ratingId];

  try {
    const [result] = await promisePool.query(sql, params);
    return result.affectedRows > 0; // Returns true if a row was updated
  } catch (error) {
    console.error("Error in modifyRating:", error.message);
    throw error;
  }
};


// Delete a rating
export const removeRating = async (ratingId) => {
  const sql = `
    DELETE FROM Ratings
    WHERE rating_id = ?
  `;
  const params = [ratingId];

  try {
    const [result] = await promisePool.query(sql, params);
    return result.affectedRows > 0; // Returns true if a row was deleted
  } catch (error) {
    console.error("Error in removeRating:", error.message);
    throw error;
  }
};
