const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const cinemaController = require('../controllers/cinemaController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
router.get('/',async (req, res) => {
    try {
       let cinemas = await cinemaController.getCinemas();
       res.send({
           cinemas: cinemas
       })
    } catch (error) {
        res.send({
            error : error
        })
    }
});
router.post('/',multipartMiddleware,async (req,res) => {
    console.log(req.body,req.files);
    try {
        let cinema = await cinemaController.createCinema(req.body);
        res.send({
            cinema: cinema
        })
    } catch (error) {
        res.send({
            error : error
        })
    }
});
router.get('/:id',async (req, res) => {
    try {
       let cinema = await cinemaController.getCinemaById(req.params.id)
       res.send({
           cinema: cinema
       })
    } catch (error) {
        res.send({
            error : error
        })
    }
});

module.exports = router;