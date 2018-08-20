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
module.exports = router
