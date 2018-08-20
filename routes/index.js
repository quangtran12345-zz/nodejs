var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('cinema/home', { title: 'My Cinema' })
})

router.get('/create', function (req, res, next) {
  res.render('cinema/create', { title: 'Create Movie' })
})
router.get('/film/:link', function (req, res, next) {
  res.render('cinema/detail', { title: '' })
})
router.get('/register', function (req, res, next) {
  res.render('cinema/register', { title: 'Register' })
})
router.get('/login', function (req, res, next) {
  res.render('cinema/login', { title: 'Login' })
})
module.exports = router
