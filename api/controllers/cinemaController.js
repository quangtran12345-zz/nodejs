const mongoose = require('mongoose')
const Cinema = mongoose.model('Cinema')
const common = require('../shared/common')
const getCinemas = async function () {
  try {
    return await Cinema.find().sort('-createdDate').exec()
  } catch (error) {
    throw error
  }
}
const getCinemaByLink = async function (link) {
  try {
    let cinema = await Cinema.findOne({ link: link })
    return cinema
  } catch (error) {
    throw error
  }
}
const createCinema = async function (data) {
  try {
    data.createdDate = new Date()
    let savedData = new Cinema(data)
    savedData = await savedData.save()
    let id = savedData.id.substr(savedData.id.length - 5)
    let convertedlink = common.convertToUsignedChar(savedData.movieName)
    let link = convertedlink.split(' ').join('-') + '-' + id
    savedData.link = link
    await savedData.save()
    return savedData
  } catch (error) {
    throw error
  }
}
module.exports = {
  getCinemas: getCinemas,
  createCinema: createCinema,
  getCinemaByLink: getCinemaByLink
}
