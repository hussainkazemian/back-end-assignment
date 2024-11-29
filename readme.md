# Media Sharing Application - Password Reset Functionality

## Overview
This project is a media sharing application that includes a feature for resetting user passwords. The password reset feature is integrated with **Twilio SendGrid** for sending reset emails.


## Prerequisites
To run this project, you need:
- **Node.js** and **npm** installed.
- **SendGrid** account for email integration.
- **MySQL** database running locally or remotely.
- **Postman** for testing.

## Project Setup
**Install bcryptjs: `npm i bcryptjs`
**Install cors package: `npm i cors`


### Set Up the Database
Create the MySQL database and tables by running the provided SQL scripts in the `database` folder:
- `create-password-reset.sql` to create the password reset table.

#### `create-password-reset.sql`
This script creates the `PasswordResets` table to store reset tokens.
```sql
CREATE TABLE PasswordResets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
```

### Run the Application
Start the server:
```bash
npm run dev
```
The server will be running at `http://127.0.0.1:3000`.

## Using SendGrid for Email
1. **Sign Up for SendGrid**: Go to [SendGrid](https://sendgrid.com) and create an account.
2. **Generate an API Key**: After logging in, navigate to the **API Keys** section and generate an API key.
3. **Verify Sender Email**: Verify your sender email in SendGrid by going to **Settings > Sender Authentication**.
4. **Add API Key to .env**: Add the API key to the `.env` file as `SENDGRID_API_KEY`.

## Password Reset Workflow
1. **User Requests Password Reset**:
   - **Endpoint**: `POST /api/auth/password-reset`
   - **Body**:
   ```json
   {
     "email": "user@example.com"
   }
   ```
   - **Response**: A reset link is sent to the user's email via SendGrid.

2. **User Receives Email**:
   - The email contains a link like `http://127.0.0.1:3000/api/auth/password-reset/<token>`.

3. **User Resets Password**:
   - **Endpoint**: `POST /api/auth/password-reset/<token>`
   - **Body**:
   ```json
   {
     "password": "newpassword123"
   }
   ```
   - **Response**: If successful, the password is updated.

4. **User Logs in with New Password**:
   - **Endpoint**: `POST /api/auth/login`
   - **Body**:
   ```json
   {
     "username": "username",
     "password": "newpassword123"
   }
   ```
   - **Response**: A JWT token for authentication is returned.

## Testing with Postman
1. **Register a User**:
   - **Endpoint**: `POST /api/auth/register`
   - **Body**:
   ```json
   {
     "username": "testuser",
     "email": "user@user.com",
     "password": "pd123"
   }
   ```

2. **Login to Get Token**:
   - Use the login endpoint to authenticate and receive a JWT token.

3. **Request Password Reset**:
   - Send a `POST` request to `/api/auth/password-reset` with the registered email.

4. **Use Password Reset Link**:
   - Use the token received in the email to reset the password.

## Common Issues and Debugging Tips
- **500 Internal Server Error**: Check the server logs for specific error messages.
- **Invalid Token**: Ensure the token has not expired and is correct.
- **Emails Not Sent**: Verify that the **SendGrid API key** and **sender email** are configured properly.
- **Database Errors**: Make sure the MySQL server is running and credentials in `.env` are correct.

## Security Considerations
- **Token Expiry**: Password reset tokens are valid for a limited period.
- **Password Hashing**: All passwords are hashed using **bcrypt** before storing in the database.
- **Environment Variables**: Sensitive information is stored in the `.env` file.



