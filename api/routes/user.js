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
router.put('/:id', async (req, res) => {
  try {
    //let savedData = await userController.updateUser(req.params.id, req.body)
    res.send({user: req})
  } catch (error) {
    res.send({
      error: req
    })
  }
})
router.put('/:id/change-avatar', fileUpload(), async (req, res) => {
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
    let savedData = await userController.addImage(req.params.id, avatarURL)
    res.status(200).send(responseStatus.Code200)
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.get('/:id', async (req, res) => {
  try {
    let user = await userController.getUser(req.params.id)
    res.send({user: user})
  } catch (error) {
    res.send({
      error: error
    })
  }
})
module.exports = router
