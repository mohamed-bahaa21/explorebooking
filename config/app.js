// File name: db.js
// Author's name: Chung Yin Tsang
// StudentID: 301216704
// Web App name: explorebooking

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
// chungyin 02/04/2023
let flash = require('connect-flash');
let passport = require('passport');


let app = express();

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));


let indexRouter = require('../routes/index');
let postRouter = require('../routes/post');
let userRouter = require('../routes/user'); //aalmario 02/04/2023
let commentRouter = require('../routes/comment');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up passport // chungyin 02/04/2023
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//set up route
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter); //aalmario 02/04/2023
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
