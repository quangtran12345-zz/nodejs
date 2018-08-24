const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../configs/responseStatus')
const common = require('../shared/common')
const generateLink = function (data) {
  let id = data.id.substr(data.id.length - 5)
  let convertedlink = common.convertToUsignedChar(data.name)
  let link = convertedlink.split(' ').join('-') + '-' + id
  return link
}
const addImage = async function (_id, avatarURL) {
  try {
    let user = await User.findOne({ _id: _id })
    if (user) {
      user.avatarURL = avatarURL
      return await user.save()
    }
  } catch (error) {
    throw error
  }
}
const updateUser = async function (id, data) {
  try {
    let user = await User.findById(id)
    if (user) {
      user.name = data.name
      user.userLink = generateLink(user)
      return await user.save()
    }
  } catch (error) {
    throw error
  }
}
const getUser = async function (id) {
  try {
    return await User.findById(id)
  } catch (error) {
    throw error
  }
}
module.exports = {
  addImage: addImage,
  updateUser: updateUser,
  getUser: getUser
}
