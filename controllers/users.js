const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();
const User = require('../models/users.js');

// Create User
router.post('/', async (req, res) => {
  // query to see if the username is already in use
  let foundUser = await User.findOne({ username: req.body.username });

  // if the username is not in use
  if (!foundUser) {
    // encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    // create a new user
    const newUser = await User.create(req.body);

    // send back JSON Web Token
    res.status(200).json({
      token: jwt.encode({
        sub: newUser.id,
        iat: new Date().getTime()
      }, process.env.SECRET)
    });

  } else {
    // there is a user with that username
    res.status(409).json({ error: "Username is already in use" })
  }
});

module.exports = router;
