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
const updateUser = async function (data) {
  try {
    let user = await User.findOne({_id: data._id})
    if (user) {
      user.username = data.username
      return await user.save()
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  addImage: addImage,
  updateUser: updateUser
}
