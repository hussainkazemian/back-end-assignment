import express from "express";
import mediaRouter from "./routes/media-router.js";
import userRouter from "./routes/user-router.js";
import commentRouter from "./routes/comment-router.js";
import ratingRouter from "./routes/rating-router.js";
import likeRouter from "./routes/like-router.js";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up Pug as the view engine
app.set("view engine", "pug");
app.set("views", "src/views");

// Static file serving
app.use(express.static("public")); // Home page assets (HTML, CSS, JS)
app.use("/uploads", express.static("uploads")); // Uploaded media files

// API documentation page
// API documentation page
app.get('/api', async (req, res) => {
  try {
    const exampleData = [
      { title: "Sample Media 1", filename: "sample1.jpg" },
      { title: "Sample Media 2", filename: "sample2.jpg" },
    ]; // Replace with dynamic data if required.
    res.render("index", {
      title: "Media Sharing REST API Documentation",
      version: process.env.npm_package_version || "1.0.0",
      exampleData, // Pass example data to the template
    });
  } catch (error) {
    console.error("Error rendering API documentation:", error.message);
    res.status(500).send("Error rendering API documentation");
  }
});

// API routes
app.use("/api/media", mediaRouter); // Media resource endpoints
app.use("/api/users", userRouter); // User resource endpoints
app.use("/api/comments", commentRouter); // Comment resource endpoints
app.use("/api/ratings", ratingRouter); // Rating resource endpoints
app.use("/api/likes", likeRouter); // Like resource endpoints

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
