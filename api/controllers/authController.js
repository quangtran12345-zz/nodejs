const mongoose = require('mongoose')
const User = mongoose.model('User')
const createUser = async function (data) {
  try {
    let userDuplicate = await User.findOne({email: data.email})
    if (userDuplicate) throw Error('Email đã tồn tại')    
    let savedUser = new User(data)
    await savedUser.save()
    return savedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}
module.exports = {
  createUser: createUser
}
