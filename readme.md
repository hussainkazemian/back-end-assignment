# Media Sharing app example REST API application

## Installation

1. Clone
2. Run `npm install`
3. Create database
4. Create .env file (see `.env.sample`)

## Run

1. Run `npm run dev`


- **Validation Rules**:
  - **Users**:
    - `username`: Must be a string of at least 3 characters. It is trimmed and sanitized to remove any harmful characters.
    - `email`: Must be a valid email address, normalized to remove unnecessary symbols.
    - `password`: Must be at least 6 characters long to ensure sufficient security.
  - **Media Items**:
    - `title`: Required and must be a non-empty string. It is trimmed and escaped to ensure it is formatted properly.
    - `description`: Required and must be a non-empty string. It is sanitized to prevent XSS attacks.

- **Validation Middleware**:
  - Validation rules were added for the **POST** and **PUT** requests. All validation errors are handled by checking the result of **express-validator** and passing them to a centralized error handler middleware.

### 2. Custom Error Handler Middleware
Custom error handling middleware was added to provide consistent error responses in JSON format across the API.

- **Middleware Implemented**:
  - **`notFoundHandler`**: Handles requests for routes that are not defined.
  - **`errorHandler`**: Returns error responses in JSON format, with fields for `message` and `status`.

- **Error Handling in Controllers**:
  - Controllers have been refactored to use the `next(error)` function for passing errors to the custom error handler middleware. This approach provides consistent and clear error messages and makes debugging easier.

### 3. Refactored Routes and Controllers
- **User Routes** (`user-router.js`):
  - Added **POST**, **PUT**, and **GET** routes for user management.
  - Validation rules were applied to ensure valid input data.
  - Token-based authentication middleware (`authenticateToken`) was used for protected routes.
  
- **Media Routes** (`media-router.js`):
  - Added **POST**, **PUT**, **DELETE**, and **GET** routes for media item management.
  - **Multer** was used to handle file uploads, with additional validation for file type and size.
  - **express-validator** was used to ensure media items have a valid `title` and `description`.

## Validation Rules

### Users
- **POST `/api/users`**:
  - `username`: Required, minimum length 3 characters.
  - `email`: Required, must be a valid email.
  - `password`: Required, minimum length 6 characters.

- **PUT `/api/users`**:
  - `username`: Optional, minimum length 3 characters.
  - `email`: Optional, must be a valid email.

### Media Items
- **POST `/api/media`**:
  - `title`: Required, must be a non-empty string.
  - `description`: Required, must be a non-empty string.

- **PUT `/api/media/:id`**:
  - `title`: Optional, must be a non-empty string.
  - `description`: Optional, must be a non-empty string.

## Error Handling

Custom error-handling middleware was created to handle errors in a structured way:

- **Centralized Error Handler**: Ensures all errors return a consistent JSON response.
- **Error Response Format**:
  - `message`: A descriptive error message.
  - `status`: The HTTP status code (e.g., `400`, `404`, `500`).

### Example Error Response
```json
{
  "error": {
    "message": "Invalid or missing fields",
    "status": 400
  }
}
