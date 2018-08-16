var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cinemaSchema = new Schema({
    movieName : String,
    movieType : String,
    publicDate : Number,
    description : String,
    imgURL : String
});
var cinemas = mongoose.model("Cinema",cinemaSchema);
module.exports = cinemas;