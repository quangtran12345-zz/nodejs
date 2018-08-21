const mongoose = require('mongoose')
const User = mongoose.model('User')
const configs = require('../configs/config')
const jwt = require('jsonwebtoken')
const responseStatus = require('../configs/responseStatus')
const createUser = async function (data) {
  try {
    let userDuplicate = await User.findOne({ email: data.email })
    if (userDuplicate) {
      throw (responseStatus.Code400({
        errorMessage: responseStatus.EXIST_EMAIL
      }))
    }
    let savedUser = new User(data)
    await savedUser.save()
    return savedUser
  } catch (error) {
    throw error
  }
}
const authen = async function (data) {
  return new Promise((resolve, reject) => {
    User.authenticate(data, function (err, user) {
      if (err) {
        console.log(err)
        return reject(responseStatus.Code500(err))
      }
      if (!user) {
        return reject(responseStatus.Code401({ errorMessage: responseStatus.WRONG_EMAIL_OR_PASSWORD }))
      }
      let token = jwt.sign({ email: user.email }, configs.secret, {
        expiresIn: configs.tokenExpire
      })
      user = user.cloneUser()
      return resolve(responseStatus.Code200({ user: user, token: token, message: responseStatus.SIGN_IN_SUCCESS }))
    })
  })
}
const authenWithToken = async function (data) {
  let decoded = jwt.verify(data.token, configs.secret)
  if (!decoded) {
    throw (responseStatus.Code400({
      errorMessage: responseStatus.INVALID_TOKEN
    }))
  } else {
    let user = await User.findOne({ email: decoded.email })
    return user
  }
}
module.exports = {
  createUser: createUser,
  authen: authen,
  authenWithToken: authenWithToken
}
