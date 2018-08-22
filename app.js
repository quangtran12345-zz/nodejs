var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var config = require('./config')
var passport = require('passport')
const engine = require('ejs-locals')
let session = require('express-session')
var mongoose = require('mongoose')
require('./api/models/cinemaModel')
require('./api/models/userModel')
var authentication = require('./api/routes/auth')
var indexRouter = require('./routes/index')
var cinemaRouter = require('./api/routes/cinema')
var usersRouter = require('./routes/users')
var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', engine)
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true })
app.use(logger('dev'))
app.use(session({
  secret: 'a very long long long key',
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}))
require('./api/configs/passport').createPassportConfig(app)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/cinema', cinemaRouter)
app.use('/api/auth', authentication)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
