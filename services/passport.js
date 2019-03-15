const bcrypt = require('bcrypt');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy({}, async (username, password, done) => {
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return done(null, false)
    }
    
    if (bcrypt.compareSync(password, foundUser.password)) {
      return done(null, foundUser)
    } else {
      return done(null, false)
    }
  } catch (err) {
    done(err, false);
  }
})


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const foundUser = await User.findById(payload.sub);
    if (foundUser) {
      done(null, foundUser);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
})

passport.use(jwtLogin);
passport.use(localLogin);
