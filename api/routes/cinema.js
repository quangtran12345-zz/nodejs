const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const cinemaController = require('../controllers/cinemaController')

router.get('/', async (req, res) => {
  try {
    let cinemas = await cinemaController.getCinemas()
    res.send({
      cinemas: cinemas
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.post('/', fileUpload(), async (req, res) => {
  console.log(req.files.file)
  let fileName = req.files.file.name
  let imageFile = req.files.file
  imageFile.mv(__dirname + '/../../public/images/' + fileName, function (err) {
    if (err) {
      res.send({
        error: err
      })
    } else {
      console.log('uploaded')
    }
  })
  try {
    req.body.imgURL = `/images/${fileName}`
    let cinema = await cinemaController.createCinema(req.body)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.get('/:link', async (req, res) => {
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
