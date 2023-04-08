// File name: passport.js
// Author's name: Chung Yin Tsang
// StudentID: 301216704
// Web App name: explorebooking


const passport = require('passport');

module.exports = function() {
  const User = require('../models/user');
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });

  require('./local')();
};