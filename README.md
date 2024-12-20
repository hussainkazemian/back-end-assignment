

## Node.js Project Setup
1. **Initialize the Project**
   - Created a Node.js project with a `package.json` file to manage dependencies and scripts.
   - Run:
    
     npm init
     npm init -y
   

2. **Install and Configure Dependencies**
   - **Nodemon** for automatic server restarts during development:
    
     npm install --save-dev nodemon
     
   - **ESLint** and **Prettier** for code linting and formatting to maintain code quality:
     
     npm install --save-dev eslint @eslint/js eslint-config-prettier globals
     npm install --save-dev --save-exact prettier
    
   - Added a `.gitignore` file to exclude unnecessary files from version control:
     
     .vscode
     node_modules
     .DS_Store
     

3. **Update package.json**
   - Set the project type to **ES Module** by adding `"type": "module"`.
   - Added a script for development:
     
     "scripts": {
       "dev": "nodemon src/index.js"
     }
   

4. **Create the Main File**
   - Created an `index.js` file for the main application logic.

5. **Run the Project**
   - To run the project, use the command:
     
     npm run dev
   

## Git Repository Setup

**Create a New Branch**
   - Created and checked out a new branch named **node-start** to start the project development.

## REST API Implementation
1. **Developed a Dummy REST API** with the following endpoints:
   - **GET /data**: Returns a JSON response with sample data.
     - URL: `http://127.0.0.1:3000/data`
     - Response:
       ```json
       {
         "message": "Data fetched successfully",
         "data": [
           { "id": 1, "name": "Item 1" },
           { "id": 2, "name": "Item 2" }
         ]
       }
       ```
   - **POST /data**: Accepts a JSON request body to add new data and returns a success message.
   - **DELETE /data**: Returns an error message indicating that the delete functionality is not implemented.
   - **PUT /data**: Returns an error message indicating that the update functionality is not implemented.
   - **404 Response**: Handles non-existing resources by returning a `404` status with an appropriate error message.
   - **GET /data**: 
     - **Method**: GET
     - **URL**: `http://127.0.0.1:3000/data`
     - **Description**: Retrieve sample data from the API.
     - **Expected Response**:
       ```json
       {
         "message": "Data fetched successfully",
         "data": [
           { "id": 1, "name": "Item 1" },
           { "id": 2, "name": "Item 2" }
         ]
       }
       ```
   - **POST /data**:
     - **Method**: POST
     - **URL**: `http://127.0.0.1:3000/data`
     - **Description**: Add new data to the API.
     - **Body**: JSON
       ```json
       {
         "id": 3,
         "name": "Item 3"
       }
       ```
     - **Expected Response**: Returns a success message with the new data added.
   - **DELETE /data**:
     - **Method**: DELETE
     - **URL**: `http://127.0.0.1:3000/data`
     - **Description**: Attempt to delete data. Returns an error message indicating that this functionality is not implemented.
     - **Expected Response**:
       ```json
       {
         "error": "Delete functionality is not implemented."
       }
       ```
   - **PUT /data**:
     - **Method**: PUT
     - **URL**: `http://127.0.0.1:3000/data`
     - **Description**: Attempt to update data. Returns an error message indicating that this functionality is not implemented.
     - **Expected Response**:
       ```json
       {
         "error": "Update functionality is not implemented."
       }
       ```
   - **404 Response**:
     - **Method**: Any
     - **URL**: `http://127.0.0.1:3000/non-existing`
     - **Description**: Accessing a non-existing endpoint.
     - **Expected Response**:
       ```json
       {
         "error": "Resource not found."
       }
       ```


