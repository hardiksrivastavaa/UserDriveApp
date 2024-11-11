const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const dotenv = require('dotenv').config();
const connectToDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Connect to the database
connectToDB();

// Set up view engine (EJS)
app.set('view engine', 'ejs');

// Set the views directory (where your .ejs files are located)
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public" directory

// This route renders the homepage (index.ejs) when visiting the root path
app.get('/', (req, res) => {
    res.render('index');  // Ensure 'index.ejs' exists in your 'views' folder
});

// Routes
app.use('/users', userRouter);   // User-related routes like login and registration
app.use('/', indexRouter);       // File management routes like /drive, /upload, etc.

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
