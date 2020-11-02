var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var indexRouter = require('./routes/index');

var passengerController = require('./routes/passenger.controller');
var packageController = require('./routes/package.controller');

let handleError = require('./helpers/error').handleError

var app = express();


app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
});


app.use('/', indexRouter);
app.use('/passenger', passengerController);
app.use('/package', packageController);


app.use((err, req, res, next) => {
    //err.isServer
    let result = handleError(err, res) ;
    res.status(500).send(result.body);
    next()
  });


module.exports = app;
