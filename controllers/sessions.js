const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('../models/users.js');

// Log In
router.post('/', async (req, res)=>{
  // force username to be lowercase
  req.body.username = req.body.username.toLowerCase();

  // Query to find user with provided username
  const foundUser = await User.findOne({
    username: req.body.username
  });

  // if there is a user with the provided username
  if (foundUser) {
    // if the provided password is correct
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      // set foundUser as currentUser
      req.session.currentUser = foundUser;
      // Send back currentUser
      res.status(200).json(req.session.currentUser);
    } else {
      // The provided password was incorrect
      res.status(409).json({ message: "Invalid credentials" })
    }
  } else {
    // there is no user with the provided username
    res.status(409).json({ message: "Invalid credentials" })
  }
});

// Log Out
router.delete('/', (req, res) => {
  // Destroy current session
  req.session.destroy(()=>{
    // Send back empty object
    res.status(200).json({})
  });
})

module.exports = router;
