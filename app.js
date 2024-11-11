const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const dotenv = require('dotenv').config();
const connectToDB = require('./config/db');
connectToDB();
const cookieParser = require('cookie-parser');

// Set up view engine (EJS)
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// This route renders the homepage (index.ejs) when visiting the root path
app.get('/', (req, res) => {
    res.render('index');  // Make sure 'index.ejs' exists in your 'views' folder
});

// Routes
app.use('/users', userRouter);   // User-related routes like login and registration
app.use('/', indexRouter);       // File management routes like /drive, /upload, etc.

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
