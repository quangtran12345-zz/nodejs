const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const generatePassword = require('password-generator')
const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer')
const configs = require('../configs/config')
const responseStatus = require('../configs/responseStatus')
const common = require('../shared/common')
const generateLink = function (data) {
  let id = data.id.substr(data.id.length - 5)
  let convertedlink = common.convertToUsignedChar(data.name)
  let link = convertedlink.split(' ').join('-') + '-' + id
  return link
}
const createUser = async function (data) {
  try {
    let userDuplicate = await User.findOne({ email: data.email })
    if (userDuplicate) {
      throw (responseStatus.Code400({
        errorMessage: responseStatus.EXIST_EMAIL
      }))
    }
    let savedUser = new User(data)
    savedUser.userLink = generateLink(savedUser)
    let newPassword = bcrypt.hashSync(data.password, 10)
    savedUser.password = newPassword
    return await savedUser.save()
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
const authenWithToken = async function (token) {
  let decoded = jwt.verify(token, configs.secret)
  if (!decoded) {
    throw (responseStatus.Code400({
      errorMessage: responseStatus.INVALID_TOKEN
    }))
  } else {
    let user = await User.findOne({ email: decoded.email })
    return user
  }
}
const sendResetPasword = async function (req) {
  let user = await User.findOne({email: req.body.email})
  if (!user) {
    throw (responseStatus.Code400({errorMessage: 'Không tìm thấy tài khoản. Vui lòng kiểm tra lại'}))
  } else if (user.providerId) {
    throw (responseStatus.Code400({errorMessage: 'Tài khoản này không thể đổi mật khẩu'}))
  }
  let token = jwt.sign({ email: req.body.email }, configs.secret, {
    expiresIn: Date.now() + 3600000
  })
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: configs.email,
      pass: configs.password
    }
  }))
  var mailOptions = {
    to: req.body.email,
    from: 'mycinema@demo.com',
    subject: 'MyCinema - Thay đổi mật khẩu',
    text: 'Chúng tôi đã thay đổi mật khẩu của bạn\n\n' +
    'Hãy bấm vào đường link dưới đây để hoàn tất việc lấy lại mật khẩu của bạn\n\n' +
    'http://' + req.headers.host + '/api/auth/reset/' + token + '\n\n' +
    'Nếu bạn không yêu cầu thay đổi này, xin hãy bỏ qua thư này '
  }
  return transporter.sendMail(mailOptions)
}
const resetPassword = async function (token) {
  let newPassword
  let user = await authenWithToken(token)
  if (user) {
    newPassword = generatePassword(6)
    let hashPassword = bcrypt.hashSync(newPassword, 10)
    user.password = hashPassword
    await user.save()
    return newPassword
  }
}
const signUpForSocial = async function (newUser) {
  try {
    let user = new User(newUser)
    user = await user.save()
    user.userLink = generateLink(user)
    user = await user.save()
    let token = jwt.sign({email: user.email}, configs.secret, {
      expiresIn: configs.expireIn
    })
    return responseStatus.Code200({ user: user, token: token })
  } catch (error) {
    return error
  }
}
module.exports = {
  createUser: createUser,
  authen: authen,
  authenWithToken: authenWithToken,
  sendResetPasword: sendResetPasword,
  resetPassword: resetPassword,
  signUpForSocial: signUpForSocial
}
