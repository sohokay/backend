const User = require('../models/user');

// 定义用户相关的服务
function getAllUsers() {
  return User.find();
}

module.exports = {
  getAllUsers
};