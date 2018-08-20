const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    let user = await authController.createUser(req.body)
    res.send({
      user: user
    })
  } catch (error) {
    res.status(400).send({
      error: error,
      errorMessage: error.message
    })
  }
})
module.exports = router
