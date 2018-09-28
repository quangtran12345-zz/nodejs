const mongoose = require('mongoose')
const Cinema = mongoose.model('Cinema')
const common = require('../shared/common')
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
      savedData = await Cinema.findByIdAndUpdate(data.id, {$set: data})
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
module.exports = {
  getCinemas: getCinemas,
  createCinema: createCinema,
  getCinemaByLink: getCinemaByLink,
  getCinema: getCinema
}
