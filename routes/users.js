const express = require('express');
const router = express.Router();
//handling user sign up
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticate} = require('../middleware/passport');
const {JWT_SECRET} = require("../const");
router.post('/register', function (req, res) { //register route (register page) (post request)
  const { username, password } = req.body;

  // 检查用户名是否存在
  Users.findOne({ username }, (err, existingUser) => {
    if (err) { return res.status(500).send({ message: '注册时发生错误' }); }
    if (existingUser) { return res.status(409).send({ message: '该用户名已存在' }); }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) { return res.status(500).send({ message: '注册时发生错误' }); }
      const user = new Users({ username, password: hashedPassword });
      user.save((err) => {
        if (err) { return res.status(500).send({ message: '注册时发生错误' }); }
        // 创建访问令牌
        const accessToken = jwt.sign({ username }, JWT_SECRET);
        user.accessToken = accessToken;
        user.save();
        res.send({ message: '注册成功',accessToken });
      });
    });
  });
});

//LOGIN ROUTES

//login logic
//middleware
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查找用户
  Users.findOne({ username }, (err, user) => {
    if (err) { return res.status(500).send({ message: '登录时发生错误' }); }
    if (!user) { return res.status(401).send({ message: '用户名或密码错误' }); }

    // 验证密码
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        // 创建访问令牌
        const accessToken = jwt.sign({ username }, JWT_SECRET);
        user.accessToken = accessToken;
        user.save();

        res.send({ accessToken });
      } else {
        res.status(401).send({ message: '用户名或密码错误' });
      }
    });
  });
});

router.get('/logout', authenticate,function (req, res) {
  req.user.accessToken = '';
  req.user.save();
  res.send({message: '注销成功' });
});
// 修改密码路由
router.put('/change-password', authenticate, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  Users.findById(req.user._id, (err, user) => {
    if (err) { return res.status(500).send({ message: '发生错误' }); }
    if (!user) { return res.status(401).send({ message: '用户未通过身份验证' }); }

    // 验证旧密码
    user.comparePassword(oldPassword, (err, isMatch) => {
      if (err) { return res.status(500).send({ message: '发生错误' }); }
      if (!isMatch) { return res.status(401).send({ message: '密码不正确' }); }

      // 如果旧密码匹配，则将新密码保存到数据库中
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) { return res.status(500).send({ message: '发生错误' }); }

        user.password = hashedPassword;
        user.save((err) => {
          if (err) { return res.status(500).send({ message: '发生错误' }); }
          res.send({ message: '密码已更改' });
        });
      });
    });
  });
});
router.delete('/',authenticate,  (req, res) => {
  Users.deleteMany({}, (err) => {
    if (err) { return res.status(500).send({ message: '发生错误' }); }
    res.send({ message: '已删除所有用户' });
  });
});
// 获取所有用户路由
router.get('/',authenticate, (req, res) => {
  console.log(req.user,'req.user')
  Users.find({}, (err, users) => {
    if (err) { return res.status(500).send({ message: '发生错误' }); }
    res.send(users);
  });
});
router.get('/protected', authenticate, (req, res) => {
  res.send({ message: '您已通过身份验证' });
});
router.get('/', (req, res) => {
  res.send({ message: '您未通过身份验证' });
} );
module.exports = router;