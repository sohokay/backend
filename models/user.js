// Path: models/user.js
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
var options = {
  errorMessages: {
    MissingPasswordError: '未提供密码',
    AttemptTooSoonError: '帐户当前已锁定。请稍后重试',
    TooManyAttemptsError: '由于登录尝试失败次数过多而锁定帐户',
    NoSaltValueStoredError: '无法进行身份验证。不存储盐值',
    IncorrectPasswordError: '密码或用户名不正确',
    IncorrectUsernameError: '密码或用户名不正确',
    MissingUsernameError: '未提供用户名',
    UserExistsError: '用户名已注册'
  }
};

UserSchema.plugin(passportLocalMongoose,options);


module.exports = mongoose.model('User', UserSchema);
