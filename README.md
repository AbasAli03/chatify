# Chat Application

This is a full-featured chat application built with React for the frontend and Node.js/Express for the backend. The application supports real-time messaging and user authentication.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Features

- Real-time messaging
- User authentication (login, registration)
- Chat rooms
- Message history
- Responsive design

## Requirements

- Node.js (v14.x or later)
- MongoDB (Atlas or local instance)
- npm (v6.x or later)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/AbasAli03/chatify.git
    cd chatify
    ```

2. **Install Dependencies**

    Navigate to the project directory and install dependencies:

    ```bash
    # For the backend
    npm install

    # For the frontend
    cd frontend
    npm install
    ```

## Environment Variables

Create a `.env` file in the `root` directory with the following variables:

```plaintext
PORT=                    # The port number on which the server will run
MONGO_DB_URI=mongodb+srv://<username>:<password>@cluster0.4uual90.mongodb.net/chat-app-db?retryWrites=true&w=majority
REFRESH_JWT_SECRET=      # Secret key for generating refresh JWTs
JWT_SECRET=              # Secret key for generating JWTs
NODE_ENV=                # Set to 'development' or 'production'
````
## Running the Application

To run the application, follow the steps for both the backend and the frontend.

### Backend

Navigate to the `backend` directory and start the server:

```bash
cd backend
npm run server
```

### Frontend
Navigate to the `frontend` directory and start the server:

```bash
cd frontend
npm run dev

