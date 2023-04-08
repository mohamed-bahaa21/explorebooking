// File name: controllers/user.js
// Author's name: Arvin Almario, Chung Yin Tsang
// StudentID: 301225269, 301216704
// Web App name: explorebooking

//import model and passport  // Added by chungyin 04/02/2023
let User = require('../models/user');
let passport = require('passport');
let crypto = require('crypto');

// User Profile //Arvin
exports.userProfile = function (req, res, next) {
  res.render(
    'userProfile',
    {
      userName: 'john_doe',
      description: 'Maria is a well-rounded graphic designer with 10 years of experience working as a logo designer and brand identity designer for large corporations, mainly in the healthcare sector. She has been a senior designer for Flag Healthcare since 2018. Most recently, she was responsible for solely designing the logo for the Flag Healthcare New Mexico division. Her main focus is creating content that not only inspires others but also functions as a powerful marketing tool to increase sales.',
      name: 'John Doe',
      gender: 'Male',
      joinedDate: 'January 1 1945',
      nationality: 'Albanian',
      interests: 'travelling when possible',
      address: 'Scarborough, Ontario, CA',
      //Added user items for authentication //chungyin 03/04/2023
      user: req.user ? req.user.firstName : '',
      userType: req.user ? req.user.userType : ''
    }
  );
};

// Render Login page. // Added by chungyin 04/02/2023
module.exports.renderLogin = function (req, res, next) {
  // res.render('login', {
  //   title: 'Login Form',
  //   messages: ["message 1", "message 2"]
  // });
  if (!req.user) {
    res.render('login', {
      title: 'Login Form',
      messages: req.flash('error') || req.flash('info'),
      user: req.user ? req.user.firstName : '',
      userType: req.user ? req.user.userType : ''
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

//Process Login // Added by chungyin 04/02/2023
module.exports.processLogin = function (req, res, next) {
  console.log("Process Login");
  passport.authenticate('local', {
    successRedirect: req.session.url || '/',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
  delete req.session.url;
};

module.exports.renderSignup = function (req, res, next) {
  if (!req.user) {
    res.render('Signup', {
      title: 'Signup Form',
      messages: req.flash('error') || req.flash('info'),
      user: req.user ? req.user.firstName : '',
      userType: req.user ? req.user.userType : ''
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

exports.processSignup = function (req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    provider: 'local'
  });

  // generate salt and hash password
  user.salt = crypto.randomBytes(16).toString('hex');
  user.password = user.hashPassword(req.body.password);

  user.save((err) => {
    if (err) {
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  });
};

//Process logout // Added by chungyin 04/02/2023
module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
