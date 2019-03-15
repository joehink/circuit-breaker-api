const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jwt-simple');
const passport = require('passport');
const router = express.Router();

const User = require('../models/users.js');

const requireSignIn = passport.authenticate('local', { session: false });

// Log In
router.post('/', requireSignIn, async (req, res)=>{
  // send back JSON Web Token
  res.status(200).json({
    token: jwt.encode({
      sub: req.user.id,
      iat: new Date().getTime()
    }, process.env.SECRET)
  });
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
