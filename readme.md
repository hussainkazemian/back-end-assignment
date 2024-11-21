# Media Sharing app example REST API application

## Installation

1. Clone
2. Run `npm install`
3. Create database
4. Create .env file (see `.env.sample`)

## Run

1. Run `npm run dev`


## User Authentication

### 1. Login (POST /api/auth/login)
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Functionality**: Allows a user to log in using their credentials (`username` and `password`). A JWT token is returned on successful authentication.
- **Response**: A JSON object containing user details and a token.
- **Error Codes**:
  - `401 Unauthorized`: Invalid credentials.

### 2. Get Current User Info (GET /api/auth/me)
- **Endpoint**: `/api/auth/me`
- **Method**: `GET`
- **Functionality**: Retrieves the currently logged-in user's information. Requires a valid JWT token in the Authorization header.
- **Response**: User details such as `user_id`, `username`, and `email`.

## Media Management

### 1. Upload Media (POST /api/media)
- **Endpoint**: `/api/media`
- **Method**: `POST`
- **Functionality**: Allows authenticated users to upload a media file (e.g., an image). The request must include a `title`, `description`, and the file in multipart form data.
- **Response**: A JSON object containing the media item ID.
- **Error Codes**:
  - `400 Bad Request`: Missing `title`, `description`, or file.
  - `401 Unauthorized`: No token or invalid token.

### 2. Update Media Details (PUT /api/media/:id)
- **Endpoint**: `/api/media/:id`
- **Method**: `PUT`
- **Functionality**: Updates an existing media item’s `title` and `description`. Only the media owner can update the item.
- **Response**: Success message on update.
- **Error Codes**:
  - `404 Not Found`: Media item not found.
  - `403 Forbidden`: User not authorized to update the item.

### 3. Delete Media (DELETE /api/media/:id)
- **Endpoint**: `/api/media/:id`
- **Method**: `DELETE`
- **Functionality**: Deletes a media item by its ID. Only the media owner or an admin can delete an item.
- **Response**: Success message on delete.
- **Error Codes**:
  - `404 Not Found`: Media item not found.
  - `403 Forbidden`: User not authorized to delete the item.

### 4. Get Media Items (GET /api/media)
- **Endpoint**: `/api/media`
- **Method**: `GET`
- **Functionality**: Retrieves all available media items.
- **Response**: List of media items.

## User Management

### 1. Update User Information (PUT /api/users)
- **Endpoint**: `/api/users`
- **Method**: `PUT`
- **Functionality**: Allows authenticated users to update their own `username` and `email`.
- **Response**: Success message on update.
- **Error Codes**:
  - `403 Forbidden`: User cannot update other users' information.

### 2. Get User by ID (GET /api/users/:id)
- **Endpoint**: `/api/users/:id`
- **Method**: `GET`
- **Functionality**: Allows an authenticated user to retrieve information about another user by their ID.
- **Response**: User details if the user exists.
- **Error Codes**:
  - `404 Not Found`: User not found.

## Error Handling
- **401 Unauthorized**: The user must be authenticated to access the endpoint.
- **403 Forbidden**: The user does not have permission to perform this action.
- **404 Not Found**: Resource not found.



