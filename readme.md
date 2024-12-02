# Media Sharing API

THe Media Sharing API is a RESTful API built to manage user accounts, authenticate users, and handle media uploads. This API allows you to create user accounts, authenticate using JWT, upload images or videos, and manage media resources.

## Features
- User Registration and Login using JWT for secure authentication.
- Password Reset functionality.
- Create, Read, Update, Delete (CRUD) operations for Media items.
- Documentation of API endpoints using apidoc.

## Documentation
The full API documentation is generated using [apidoc](https://apidocjs.com) and served within the application.

- **URL for API Documentation**: [http://localhost:3000/docs](http://localhost:3000/docs)

### Available Endpoints
#### **Authentication Endpoints**
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Authenticate a user and get a JWT token.
- **GET** `/api/auth/me` - Retrieve the authenticated user's details.
- **POST** `/api/auth/password-reset` - Request a password reset.
- **POST** `/api/auth/password-reset/:token` - Reset the user's password.

#### **Media Endpoints**
- **POST** `/api/media` - Upload a new media file (authenticated users only).
- **GET** `/api/media/:id` - Get a media item by its ID.
- **PUT** `/api/media/:id` - Update a media item by its ID (authenticated users only).
- **DELETE** `/api/media/:id` - Delete a media item by its ID (authenticated users only).
- **GET** `/api/media` - Get all media items.

## Installation
To set up this project on your local machine, please follow the steps below:

### Prerequisites
- Node.js (v16 or above recommended)
- npm (Node Package Manager)
- MariaDB or any other MySQL-compatible database

### Setup

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd authentication
   ```

2. **Install Dependencies**
   Run the following command to install all required packages:
   ```sh
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory of the project and add the following configurations:
   ```env
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE_IN=7d
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_db_password
   DB_NAME=mediasharingapp
   ```

4. **Database Setup**
   Create a new database named `mediasharingapp` in your MariaDB or MySQL instance.

5. **Run the Application**
   Use `nodemon` for development purposes to automatically restart the server on changes:
   ```sh
   npm run dev
   ```
   The server should start at [http://localhost:3000](http://localhost:3000).

6. **Generate API Documentation**
   Run the following command to generate API documentation:
   ```sh
   npm run generate-docs
   ```
   This command will generate the documentation in the `docs/` directory.

7. **View API Documentation**
   Visit [http://localhost:3000/docs](http://localhost:3000/docs) to see the generated documentation in your browser.

## Dependencies
Here are the main dependencies used in the project:
- **Express**: Web framework for Node.js.
- **Helmet**: Secures HTTP headers.
- **Cors**: Enables cross-origin resource sharing.
- **Multer**: Handles file uploads.
- **jsonwebtoken**: Provides JWT-based authentication.
- **express-validator**: Validates incoming request data.
- **dotenv**: Loads environment variables.
- **apidoc**: Generates API documentation from annotations in your source code.

## Scripts
- **`npm run dev`**: Start the development server with `nodemon`.
- **`npm run generate-docs`**: Generate the API documentation using `apidoc`.

## Project Structure
- **src/routes**: Contains all route files for users, authentication, and media.
- **src/controllers**: Contains controller logic for each entity.
- **src/middlewares**: Contains middlewares for authentication, validation, and error handling.
- **docs**: Contains the generated API documentation.
- **public**: Static files such as HTML, CSS, JavaScript for the client.

## Usage
1. **Register a User**:
   - Use `/api/auth/register` to register a new user.
2. **Login**:
   - Authenticate using `/api/auth/login` and get a JWT token.
3. **Access Media Resources**:
   - Use the JWT token to create, retrieve, update, and delete media items.


