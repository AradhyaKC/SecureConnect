var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose=require('mongoose');
const secureConnect=require('./secureConnect');
const expressip = require('express-ip');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users').router;
var portsRouter=require("./routes/ports").router;
var app = express();

app.use(expressip().getIpInfoMiddleware);

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{useNewUrlParser:true, useUnifiedTopology:true,dbName:"SecureConnect"});
const db = mongoose.connection;
db.on('error',()=>{
  console.error('mongodb connection error');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/ports",portsRouter);

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
