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
router.put('/:id', fileUpload(), async (req, res) => {
  try {
    let savedData = await userController.updateUser(req.params.id, req.body)
    res.send({user: savedData})
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.post('/', async (req, res) => {
  try {
    let savedData = await userController.updateUser(req.body._id, req.body)
    res.send({user: savedData})
  } catch (error) {
    res.send({
      error: 'Lỗi xảy ra vui lòng thử lại'
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
    res.send(responseStatus.Code200({message: 'Thay đổi avatar thành công'}))
  } catch (error) {
    res.send({
      error: error
    })
  }
})

router.post('/change-password', async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    const user = await authController.authenWithToken(token)
    if (!user) {
      throw responseStatus.Code400({errorMessage: 'User not found'})
    }
    const response = await userController.changePassword(user, req.body.oldPassword, req.body.newPassword)
    res.send(response)
  } catch (error) {
    res.send({
      error: error
    })
  }
})

router.post('/edit', async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    const user = await authController.authenWithToken(token)
    if (!user) {
      throw responseStatus.Code400({errorMessage: 'User not found'})
    }
    const response = await userController.updateUser(user._id, req.body)
    res.send(responseStatus.Code200({message: 'Update info successfully', response}))
  } catch (error) {
    res.send({
      error: error
    })
  }
})

router.post('/change-avatar', fileUpload(), async (req, res) => {
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
    const token = req.headers['x-access-token']
    const user = await authController.authenWithToken(token)
    if (!user) {
      throw responseStatus.Code400({errorMessage: 'User not found'})
    }
    let avatarURL = `/images/${fileName}`
    let savedData = await userController.addImage(user._id, avatarURL)
    res.send(responseStatus.Code200({message: 'Update avatar succesfully'}))
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
router.post('/reset-password', async (req, res) => {
  try {
    let result = await authController.sendResetPasword(req)
    if (result) {
      res.status(200).send(
        responseStatus.Code200({message: 'Yêu cầu thay đổi mật khẩu thành công.Vui lòng kiểm tra email'})
      )
    }
  } catch (error) {
    res.status(400).send({error: error})
  }
})
module.exports = router
