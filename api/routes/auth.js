const express = require('express')

const router = express.Router()
var passport = require('../configs/passport').passport
const authController = require('../controllers/authController')
var responseStatus = require('../configs/responseStatus')
const ejs = require('ejs')
router.post('/signup', async (req, res) => {
  try {
    let user = await authController.createUser(req.body)
    res.send({
      user: user
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/signin', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return res.status(err.status).send(err)
    if (!user) {
      return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.WRONG_EMAIL_OR_PASSWORD }))
    }
    req.logIn(user, async function (err) {
      if (err) { return next(err) }
      return res.send(responseStatus.Code200({
        token: info.token
      }))
    })
  })(req, res, next)
})
router.post('/user', async (req, res) => {
  try {
    let authenUser = await authController.authenWithToken(req.body.token)
    res.send(authenUser)
  } catch (error) {
    res.send({error: error})
  }
})
router.post('/forgot-password', async (req, res) => {
  try {
    let result = await authController.sendResetPasword(req)
    if (result) {
      res.status(200).send(responseStatus.Code200({message: 'Yêu cầu thay đổi mật khẩu thành công.Vui lòng kiểm tra email'}))
    }
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/reset/:token', async (req, res) => {
  try {
    let newPassword = await authController.resetPassword(req.params.token)
    res.setHeader('Content-Type', 'text/html')
    res.send(`<body style="font-family: Arial; font-size: 12px;"><div><p>Mật khẩu của bạn đã được đặt lại.</p><p>Mật khẩu mới của bạn là.</p><h2>${newPassword}`)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (err) {
      return res.send({ errorMessage: err })
    }
    res.send({token: info})
  })(req, res, next)
})
module.exports = router
