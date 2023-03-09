import express from 'express';

const router = express.Router();
import {authenticate} from '../../middleware/passport.js';
import {register, login, changePassword, deleteAll, getAll} from './User.controller.js';

router.post('/register', (req, res, next) => register(req, res, next));

router.post('/login', (req, res, next) => login(req, res, next));

router.put('/change-password', authenticate, (req, res, next) => changePassword(req, res, next));
router.delete('/', authenticate, (req, res,next) => deleteAll(req, res,next));
// 获取所有用户路由
router.get('/', authenticate, (req, res,next) => getAll(req, res,next));
// router.get('/protected', authenticate, (req, res) => protected(req, res));

export default router;
// export {router as default};
