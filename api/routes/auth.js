const express = require('express')

const router = express.Router()
var passport = require('../configs/passport').passport
const authController = require('../controllers/authController')
var responseStatus = require('../configs/responseStatus')

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
    let authenUser = await authController.authenWithToken(req.body)
    res.send(authenUser)
  } catch (error) {
    res.send({error: error})
  }
})
module.exports = router
