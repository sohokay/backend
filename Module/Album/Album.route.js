const express = require('express');
const router = express.Router();
const albumController = require('./album.controller');

const { authenticate } = require('../../middleware/passport');

// 创建专辑
router.post('/', authenticate, albumController.createAlbum);
// 修改专辑
router.put('/:id', authenticate, albumController.updateAlbum);

// 获取所有专辑
router.get('/', albumController.getAllAlbums);

// 获取单个专辑
router.get('/:id', albumController.getAlbumById);

// 更新专辑信息
router.patch('/:id', authenticate, albumController.updateAlbum);

// 删除专辑
router.delete('/:id', authenticate, albumController.deleteAlbum);

// 添加文章到专辑
router.post('/:id/articles', authenticate, albumController.addArticleToAlbum);

module.exports = router;
