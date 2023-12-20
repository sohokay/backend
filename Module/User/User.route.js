import express from 'express';

const router = express.Router();
import {authenticate} from '../../middleware/passport.js';
import {register, login, changePassword, deleteAll, getAll} from './User.controller.js';

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register
 *     description: Register
 *     tags:
 *       - User
 *     requestBody:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The user name.
 *                   example: user
 *                   required: true
 *                   minLength: 3
 *                   maxLength: 20
 *                   pattern: "^[a-zA-Z0-9_]+$"
 *                   uniqueItems: true
 *                 password:
 *                   type: string
 *                   description: The user password.
 *                   example: password
 *                   required: true
 *                   minLength: 6
 *                   maxLength: 20
 *                   pattern: "^[a-zA-Z0-9_]+$"
 *                   uniqueItems: true
 *
 *
 */
router.post('/register', (req, res, next) => register(req, res, next));

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login
 *     description: Login
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 */
router.post('/login', (req, res, next) => login(req, res, next));

router.put('/change-password', authenticate, (req, res, next) => changePassword(req, res, next));
router.delete('/', authenticate, (req, res,next) => deleteAll(req, res,next));
// 获取所有用户路由
router.get('/', authenticate, (req, res,next) => getAll(req, res,next));
// router.get('/protected', authenticate, (req, res) => protected(req, res));

export default router;
// export {router as default};
