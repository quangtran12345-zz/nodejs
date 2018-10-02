const express = require('express')

const router = express.Router()
const fileUpload = require('express-fileupload')
const cinemaController = require('../controllers/cinemaController')
const authController = require('../controllers/authController')
const responseStatus = require('../configs/responseStatus')
const common = require('../shared/common')
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
const checkAuthorization = function (res, req, next) {

}
router.get('/', async (req, res) => {
  try {
    let cinemas = await cinemaController.getCinemas()
    res.send({
      films: cinemas
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.post('/', fileUpload(), async (req, res) => {
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
    if (fileName) {
      req.body.posterURL = `/images/${fileName}`
    }
    // let parsedCookie = common.parseCookies(req)
    // let authenUser = await authController.authenWithToken(parsedCookie.token)
    let cinema = await cinemaController.createCinema(req.body, req.body.creatorId)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    const user = await authController.authenWithToken(token)
    if (!user) {
      throw responseStatus.Code400({errorMessage: 'User not found'})
    }
    const response = await cinemaController.deleteMovie(user, req.body._id)
    res.send(response)
  } catch (error) {
    res.send({
      error: error
    })
  }
})

router.post('/edit', fileUpload(), async (req, res) => {
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
      throw responseStatus.Code400({errorMessage: 'Invalid request'})
    }
    if (user._id.toString() !== req.body.creatorId) {
      throw responseStatus.Code400({errorMessage: 'User has no authorization to access movie'})
    }
    if (fileName) {
      req.body.posterURL = `/images/${fileName}`
    }

    let cinema = await cinemaController.createCinema(req.body, user._id)
    if (cinema) {
      res.send(responseStatus.Code200({message: 'Edit movie successfully'}))
    } else {
      throw responseStatus.Code400({errorMessage: 'Movie not found'})
    }
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.get('/:id', async (req, res) => {
  try {
    let cinema = await cinemaController.getCinema(req.params.id)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.get('/link/:link', async (req, res) => {
  try {
    let cinema = await cinemaController.getCinemaByLink(req.params.link)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})

module.exports = router
