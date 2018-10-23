const mongoose = require('mongoose')
const Cinema = mongoose.model('Cinema')
const common = require('../shared/common')
const responseStatus = require('../configs/responseStatus')
const getCinemas = async function () {
  try {
    return await Cinema.find().sort('-createdDate').populate('user').exec()
  } catch (error) {
    throw error
  }
}
const getCinemaByLink = async function (link) {
  try {
    let cinema = await Cinema.findOne({ link: link }).populate('user')
    return cinema
  } catch (error) {
    throw error
  }
}
const getCinema = async function (id) {
  try {
    let cinema = await Cinema.findById(id).populate('user')
    return cinema
  } catch (error) {
    throw error
  }
}
const createCinema = async function (data, userId) {
  let savedData
  try {
    if (!data.id) {
      data.createdDate = new Date()
      savedData = new Cinema(data)
      savedData.user = userId
      savedData.creatorId = savedData.user
      savedData = await savedData.save()
      let link = generateLink(savedData)
      savedData.link = link
      savedData = await savedData.save()
    } else {
      data.link = generateLink(data)
      await Cinema.findByIdAndUpdate(data.id, {$set: data})
      savedData = await Cinema.findById(data.id)
    }
    return savedData
  } catch (error) {
    throw error
  }
}
const generateLink = function (data) {
  let id = data.id.substr(data.id.length - 5)
  let convertedlink = common.convertToUsignedChar(data.name)
  let link = convertedlink.split(' ').join('-') + '-' + id
  return link
}
const deleteMovie = async (user, movieId) => {
  const movie = await Cinema.findById(movieId)
  if (!movie) {
    throw responseStatus.Code404({ errorMessage: 'Movie not found' })
  }
  if (movie.creatorId !== user._id.toString()) {
    throw responseStatus.Code404({ errorMessage: 'User has no authorization to access this movie' })
  }
  await Cinema.findByIdAndRemove(movieId)
  return responseStatus.Code200({message: 'Delete movie succesfully'})
}
module.exports = {
  getCinemas: getCinemas,
  createCinema: createCinema,
  getCinemaByLink: getCinemaByLink,
  getCinema: getCinema,
  deleteMovie: deleteMovie
}
