var mongoose = require('mongoose')
var Schema = mongoose.Schema
var cinemaSchema = new Schema({
  link: String,
  movieName: String,
  movieType: String,
  publicDate: Number,
  description: String,
  imgURL: String,
  createdDate: Number
})
var cinemas = mongoose.model('Cinema', cinemaSchema)
module.exports = cinemas
