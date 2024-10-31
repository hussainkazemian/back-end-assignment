Moved Files and Updated Directory Structure

Moved app.js to src/app.js to keep source files organized.

Removed unnecessary index.js file to avoid redundancy.

Updated paths and imports in app.js to reflect the new directory structure.

Installed Dependencies

Installed necessary dependencies:

express: Web framework for handling HTTP requests. npm install express

pug: Template engine for server-side rendering. npm install pug.
morgan: Middleware for logging HTTP requests.

cookie-parser: Middleware for parsing cookies.

Updated app.js to Serve Static Files

Added code to serve static files from the /media directory so media items can be accessed directly via URL: app.use('/media', express.static(path.join(__dirname, '../media')));

Modified the media.js File

Created routes for handling media items (GET, POST, PUT, and DELETE).

Added a url property to each media item to provide the URL for accessing the corresponding image.

Nodemon Configuration

Created a nodemon.json file to specify which files to watch and which to ignore, preventing unnecessary restarts:
{
  "ignore": ["node_modules", "public"],
  "watch": ["src"],
  "ext": "js,json,pug",
  "delay": "2000"
}
Added app.listen() to app.js

Ensured the server starts properly and listens for requests:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

Postman Testing

Use Postman to interact with the REST API.

Available Endpoints

GET All Media Items

URL: http://localhost:3000/api/media

Method: GET

Description: Retrieve a list of all media items.

GET Specific Media Item

URL: http://localhost:3000/api/media/:id

Replace :id with the specific media ID.

Method: GET

Description: Retrieve a specific media item by ID.

POST a New Media Item

URL: http://localhost:3000/api/media

Method: POST

Body: JSON :{
  "filename": "newImage.png",
  "filesize": 102400,
  "title": "New Image",
  "description": "This is a new image.",
  "user_id": 7890,
  "media_type": "image/png",
  "created_at": "2023-11-01T10:00:00.000Z"
}
Description: Add a new media item.

PUT Update a Media Item

URL: http://localhost:3000/api/media/:id

Method: PUT

Description: Update the information for a specific media item.

DELETE a Media Item

URL: http://localhost:3000/api/media/:id

Method: DELETE

Description: Delete a specific media item.

Viewing Media Files

Media files are available in the /media folder and can be accessed through URLs such as:

http://localhost:3000/media/imm.png

http://localhost:3000/media/user.png

Use GET requests to access these URLs in a browser or Postman to view/download the images.
