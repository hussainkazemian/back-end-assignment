This is a student projeect based.

Node.js Project Setup:
Created a Node.js project with a package.json file to manage dependencies and scripts.
o Run npm init and npm init-y in the Terminal.
o Installed nodemon for automatic server restarts during development
= npm install --save-dev nodemon
o Configured ESLint and .prettierrc for code linting to maintain code quality =
npm install --save-dev --save-exact prettier
npm install --save-dev eslint @eslint/js eslint-config-prettier globals

o Added a .gitignore file to exclude unnecessary files from version control.
.vscode
node_modules
.DS_Store
o Review the package.json by adding :
"type": "module",
"scripts": {
"dev": "nodemon src/index.js",
o Creating index.js file.
o Npm run dev

2. Git Repository:
   o Initialized a Git repository and created a remote repo on GitHub.
   o Created and checked out a new branch named node-start.

3. REST API Implementation:
   o Developed a dummy REST API with the following endpoints:
    GET /data: Returns a JSON response with sample data.
   Set the request type to GET and enter the URL: http://127.0.0.1:3000/data
   { "message": "Data fetched successfully", "data": [
   { "id": 1, "name": "Item 1" },
   { "id": 2, "name": "Item 2" }
   ]
   }
    POST /data: Accepts a JSON request body to add new data and returns a success message.
    DELETE /data: Returns an error message indicating that the delete functionality is not implemented.
    PUT /data: Returns an error message indicating that the update functionality is not implemented.
    404 Response: Handles non-existing resources by returning a 404 status with an appropriate error message.
4. Documentation:
   o Documented the API functionality and setup in a README.md file, detailing how to run the project and test the endpoints.
   o Followed best practices, including meaningful variable names and proper commenting.
   o Created a GitHub repository with the complete code and a link provided for submission.
   https://github.com/hussainkazemian/back-end-assignment/tree/main

#   b a c k - e n d - a s s i g n m e n t 
 
 

# REST API Documentation

## Endpoints

| Endpoint               | Method | Description                                  | Request Body Example         | Response Body Example                                                                                                | Status Codes                 |
| ---------------------- | ------ | -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `/data`                | GET    | Retrieve a list of all items                 | N/A                          | `{ "message": "Data fetched successfully", "data": [{ "id": 1, "name": "Item 1" }, { "id": 2, "name": "Item 2" }] }` | 200 OK, 404 Not Found        |
| `/data`                | POST   | Create a new item                            | `{ "name": "New Item" }`     | `{ "message": "Data added successfully", "data": { "id": 3, "name": "New Item" } }`                                  | 201 Created, 400 Bad Request |
| `/data`                | DELETE | Delete a specific item (dummy functionality) | N/A                          | `{ "error": "Delete functionality is not implemented." }`                                                            | 500 Internal Server Error    |
| `/data`                | PUT    | Update a specific item (dummy functionality) | `{ "name": "Updated Item" }` | `{ "error": "Update functionality is not implemented." }`                                                            | 500 Internal Server Error    |
| Any non-matching route | GET    | Handle 404 errors for non-existing resources | N/A                          | `{ "error": "Resource not found." }`                                                                                 | 404 Not Found                |

## Additional Considerations

- **Headers Required**: e.g., authentication tokens (e.g., `Authorization: Bearer <token>`).
- **Query Parameters**: For filtering, sorting, or pagination (e.g., `/data?sort=name`).
- **Detailed Explanations**: Each field in the request and response bodies.
- **Error Messages**: Detailed descriptions of the error messages for different status codes.
- **Authentication/Authorization**: Specify how users can authenticate.
