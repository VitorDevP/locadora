var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const movieRoute = require('./routes/movies.route');
const locadoraRoute = require('./routes/locadora.route');
const historyRoute = require('./routes/history.route');
const usersRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/movies', movieRoute)
app.use('/api/v1/locadora', locadoraRoute)
app.use('/api/v1/history', historyRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/auth', authRoute)

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
  res.send('error: '+err.message);
});

module.exports = app;
