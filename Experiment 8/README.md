# User Authentication Application

A simple user authentication system built with Node.js, Express, MongoDB, and Express Sessions.

## Features

- User signup and registration
- User login with session management
- Protected dashboard route
- User logout functionality
- MongoDB database integration

## Project Structure

```
user-auth-app/
├── node_modules/          → Installed npm packages
├── server.js              → Main server file (application logic)
├── package.json           → Project configuration file
├── package-lock.json      → Dependency lock file (auto generated)
└── README.md              → Project description
```

## Installation

1. Make sure you have MongoDB installed and running on your system
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the MongoDB service
2. Run the application:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /` - Home page with signup and login forms
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /dashboard` - Protected dashboard (requires login)
- `GET /logout` - User logout

## Database

The application uses MongoDB to store user credentials. The database connection is configured to connect to `mongodb://127.0.0.1:27017/userDB` by default.

## Security Notes

This is a basic implementation for educational purposes. For production use, consider:
- Password hashing (bcrypt)
- Input validation and sanitization
- CSRF protection
- Rate limiting
- Environment variables for sensitive data
