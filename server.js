// Dependencies
require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Config
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;


//DB Setup
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to mongo');
})


// App Setup
app.use(cors());
app.use(express.json());


// Controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const routinesController = require('./controllers/routines.js');
app.use('/routines', routinesController);


// Server Setup
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
})
