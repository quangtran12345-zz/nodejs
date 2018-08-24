const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../configs/responseStatus')
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
