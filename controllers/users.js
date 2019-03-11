const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// Create User
router.post('/', async (req, res) => {
  // force username to be lowercase
  req.body.username = req.body.username.toLowerCase();

  // query to see if the username is already in use
  let foundUser = await User.findOne({
    username: req.body.username
  })

  // if the username is not in use
  if (!foundUser) {
    // encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    // create a new user
    const newUser = await User.create(req.body);

    // set foundUser as currentUser
    req.session.currentUser = newUser;

    // send back user object
    res.status(200).json(req.session.currentUser);
  } else {
    // there is a user with that username
    res.status(409).json({
      message: "Username is already in use"
    })
  }
});

router.get('/', (req, res) => {
  res.status(200).json(req.session.currentUser);
})

module.exports = router;
