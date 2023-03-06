// Path: models/User.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {generateUUID} = require("../../middleware/uuid");
const UserSchema = new mongoose.Schema({
  _id: {type: String, default: generateUUID()},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
// 预处理中间件，在保存之前自动更新 created_at 和 updated_at 字段
UserSchema.pre('save', function (next) {
  const now = Date.now();

  if (!this.created_at) {
    this.created_at = now;
  }

  this.updated_at = now;

  next();
});
// 比较密码
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema);
