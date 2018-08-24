var mongoose = require('mongoose')
var Schema = mongoose.Schema
var cinemaSchema = new Schema({
  link: String,
  name: String,
  genre: String,
  releaseDate: Number,
  content: String,
  posterURL: String,
  createdDate: Number,
  creatorId: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})
var cinemas = mongoose.model('Cinema', cinemaSchema)
module.exports = cinemas
