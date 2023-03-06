const User = require('../Module/User/User.model');

// 定义用户相关的服务
function getAllUsers() {
  return User.find();
}

module.exports = {
  getAllUsers
};
