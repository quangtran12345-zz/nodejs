var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  providerId: {
    type: String
  },
  avatarURL: {
    type: String
  },
  provider: {
    type: String
  },
  userLink: {
    type: String
  }
})
UserSchema.methods.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var error = new Error('User not found.')
        error.status = 401
        return callback(error)
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return callback()
        }
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}
UserSchema.methods.authenticate = function (password) {
  if (bcrypt.compareSync(password, this.password)) {
    return true
  } else {
    return false
  }
}
var User = mongoose.model('User', UserSchema)
module.exports = User
