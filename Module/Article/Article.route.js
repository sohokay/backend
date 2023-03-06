import express from 'express';
const router = express.Router();
import {authenticate} from '../../middleware/passport';
import ArticleController from './Article.controller';
import {checkArticle} from './Article.middleware';
// 获取所有文章
router.get('/', authenticate, (req, res, next) => ArticleController.getAll(req, res, next));

// 获取单篇文章
router.get('/:id', (req, res, next) => ArticleController.getById(req, res, next));

// 创建新文章
router.post('/', authenticate, (req, res, next) => ArticleController.create(req, res, next));

// 更新文章
router.put('/:id', authenticate,checkArticle, (req, res, next) => ArticleController.updateById(req, res, next));

// 删除文章
router.delete('/:id', authenticate,checkArticle, (req, res, next) => ArticleController.deleteById(req, res, next));

export default router;
