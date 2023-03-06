import express from 'express';
const router = express.Router();
import {createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum, addArticleToAlbum} from './Album.controller';

import { authenticate } from '../../middleware/passport';

// 创建专辑
router.post('/', authenticate, createAlbum);
// 修改专辑
router.put('/:id', authenticate, updateAlbum);

// 获取所有专辑
router.get('/', getAllAlbums);

// 获取单个专辑
router.get('/:id', getAlbumById);

// 更新专辑信息
router.patch('/:id', authenticate, updateAlbum);

// 删除专辑
router.delete('/:id', authenticate, deleteAlbum);

// 添加文章到专辑
router.post('/:id/articles', authenticate, addArticleToAlbum);

export default router;
