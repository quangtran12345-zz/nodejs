const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const responseStatus = require('../configs/responseStatus')
const checkAuthentication = function (req, res, next) {
  let token = cookie.parse(req.body)
  if (token) {
    authController.authenWithToken(token)
      .then(() => {
        return next()
      })
      .catch(error => {
        res.status(error.status).send(error)
      })
  } else {
    res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.INVALID_REQUEST }))
  }
}
router.post('/avatar', fileUpload(), async (req, res) => {
  let fileName
  if (req.files) {
    fileName = req.files.file.name
    let imageFile = req.files.file
    imageFile.mv(__dirname + '/../../public/images/' + fileName, function (err) {
      if (err) {
        res.send({
          error: err
        })
      }
    })
  }
  try {
    let avatarURL = `/images/${fileName}`
    let savedData = await userController.addImage(req.body._id, avatarURL)
    res.send({avatarURL: savedData.avatarURL})
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.post('/', async (req, res) => {
  try {
    let savedData = await userController.updateUser(req.body)
    res.send({user: savedData})
  } catch (error) {
    res.send({
      error: error
    })
  }
})

module.exports = router
