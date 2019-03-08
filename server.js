// DEPENDENCIES
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

// CONFIG
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// CONTOLLERS
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);



app.listen(PORT, () => {
  console.log("Listening on port", PORT);
})

mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to mongo');
})