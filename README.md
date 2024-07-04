# Talk-a-tive App (Chat Application)

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Material-UI. The application allows users to log in by simply entering their name, view a list of other users, and engage in real-time conversations with them. The project utilizes Socket.io for real-time communication.

# Fetures

## User Login:

Users can log in by entering their name (no password required).

## User List:

Displays a list of all users except the logged-in user.

## Real-Time Chat:

Users can send and receive messages in real-time.

## Message History:

Displays the chat history between users.

## Material-UI Styling:

The application is styled using Material-UI components for a modern and responsive design.

# Backend Implementation

## Database Connection

Database Connection: A MongoDB connection is established using Mongoose. The connection settings are stored in the .env file.

## Models

User Model: Defines the user schema and model. Each user has a name.
Message Model: Defines the message schema and model. Each message includes the sender, receiver, content, and timestamp.

## Routes

User Routes: Handles user-related operations such as creating a new user and retrieving all users.
Message Routes: Handles message-related operations such as creating a new message and retrieving messages between two users.

## Server Setup

Express Server: Sets up an Express server with routes for users and messages.
Socket.io: Integrates Socket.io for real-time communication between users.

# Frontend Implementation

## Components

### Login Component

Login Component: Allows users to log in by entering their name. Uses Material-UI for input fields and buttons.

### Sidebar Component

Sidebar Component: Displays a list of all users except the logged-in user. Uses Material-UI for the list and list items.

### Chat Component

Chat Component: Displays the chat history between the logged-in user and the selected user. Allows sending and receiving messages in real-time using Socket.io. Uses Material-UI for the chat interface.

## Pages

ChatPage: Combines the Login, Sidebar, and Chat components to create the main chat interface

# Getting Started with App

1. Create a .env file in the backend directory with your mongodb URI.
2. Navigate to the backend directory and run npm install to install backend dependencies.
3. Start the backend server by running node server.js or npm start.
4. Navigate to the frontend directory and run npm install to install frontend dependencies.

## Usage

Open the application in your browser.
Enter your name to log in.
Select a user from the sidebar to start chatting.
Send and receive messages in real-time.

## Technologies Used

MongoDB Atlas: For the database.
Express: For the backend server.
React: For the frontend application.
Node.js: For the backend environment.
Socket.io: For real-time communication.
Material-UI: For UI components and styling.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
