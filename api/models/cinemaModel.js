var mongoose = require('mongoose')
var Schema = mongoose.Schema
var cinemaSchema = new Schema({
  link: String,
  movieName: String,
  movieType: String,
  publicDate: Number,
  description: String,
  imgURL: String,
  createdDate: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})
var cinemas = mongoose.model('Cinema', cinemaSchema)
module.exports = cinemas
