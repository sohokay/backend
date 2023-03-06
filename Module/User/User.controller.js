const UserModel = require("./User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../const");

// 生成访问令牌
const generateAccessToken = (user) => {
  // console.log('8 user', user);
  return jwt.sign({
    username: user.username,
    _id: user._id,
  }, JWT_SECRET, {expiresIn: '1h'});
}

export async function register(req, res, next) {
  const {username, password} = req.body;

  // 检查用户名是否存在
  UserModel.findOne({username}, (err, existingUser) => {
    if (err) {
      return res.status(500).send({message: '注册时发生错误'});
    }
    if (existingUser) {
      return res.status(409).send({message: '该用户名已存在'});
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send({message: '注册时发生错误'});
      }
      const user = new UserModel({username, password: hashedPassword});
      user.save((err) => {
        if (err) {
          return res.status(500).send({message: '注册时发生错误'});
        }
        // 创建访问令牌
        const accessToken = generateAccessToken(user);
        // user.accessToken = accessToken;
        // user.save();
        res.send({message: '注册成功', accessToken});
      });
    });
  });
}

export async function login(req, res, next) {
  const {username, password} = req.body;

  // 查找用户
  UserModel.findOne({username}, (err, user) => {
    if (err) {
      return res.status(500).send({message: '登录时发生错误'});
    }
    if (!user) {
      return res.status(401).send({message: '用户名或密码错误'});
    }

    // 验证密码
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        // 创建访问令牌
        const accessToken = generateAccessToken(user);
        // user.accessToken = accessToken;
        res.send({accessToken});
      } else {
        res.status(401).send({message: '用户名或密码错误'});
      }
    });
  });
}

export async function logout(req, res, next) {
  req.user.accessToken = '';
  req.user.save();
  res.send({message: '注销成功'});
}

export async function changePassword(req, res, next) {
  const {oldPassword, newPassword} = req.body;

  UserModel.findById(req.user._id, (err, user) => {
    if (err) {
      return res.status(500).send({message: '发生错误'});
    }
    if (!user) {
      return res.status(401).send({message: '用户未通过身份验证'});
    }

    // 验证旧密码
    user.comparePassword(oldPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).send({message: '发生错误'});
      }
      if (!isMatch) {
        return res.status(401).send({message: '密码不正确'});
      }

      // 如果旧密码匹配，则将新密码保存到数据库中
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send({message: '发生错误'});
        }

        user.password = hashedPassword;
        user.save((err) => {
          if (err) {
            return res.status(500).send({message: '发生错误'});
          }
          res.send({message: '密码已更改'});
        });
      });
    });
  });
}

export async function deleteAll(req, res, next) {
  UserModel.deleteMany({}, (err) => {
    if (err) {
      return res.status(500).send({message: '发生错误'});
    }
    res.send({message: '已删除所有用户'});
  });
}

export async function getAll(req, res, next) {
  UserModel.find({}, (err, users) => {
    if (err) {
      return res.status(500).send({message: '发生错误'});
    }
    res.send(users);
  });
}

/*export async function protected(req, res) {
  res.send({message: '您已通过身份验证'});
}*/
