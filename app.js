var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var sessions = require('client-sessions')
require('dotenv').config()

const MONGODB_URI = (process.env.NODE_ENV === 'test') ?
  process.env.MONGODB_TEST_URI
  : process.env.MONGODB_APP_URI;

mongoose.connect(MONGODB_URI, function(err, res){
  if (err){
    console.log('DB CONNECTION: ' + err)
  }
  else {
    console.log('DB CONNECTION SUCCESS: ' + MONGODB_URI)
  }
})

var routes = require('./routes/index')
var api = require('./routes/api')
var account = require('./routes/account')
var sendgrid = require('./routes/sendgrid')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 24*60*60*1000, // 1 day
  activeDuration:30*60*1000
}))
app.use(express.static(path.join(__dirname, 'public')))

// App top-level routes
app.use('/', routes)
app.use('/api', api)
app.use('/account', account)
app.use('/sendgrid', sendgrid)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
