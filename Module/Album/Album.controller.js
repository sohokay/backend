// albumController.js

import Album from './Album.model';
import Article from '../Article/Article.model';

// 创建专辑
export const createAlbum = async (req, res) => {
  const {name, coverImage, description} = req.body;
  const createdBy = req.user._id;

  try {
    const album = await Album.create({name, coverImage, createdBy, description});
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// 获取所有专辑
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({createdBy: req.user._id});
    res.json(albums);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// 获取单个专辑
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate('creator', 'username') // 关联查询专辑创建者的username字段
      .populate('articles', 'title') // 关联查询专辑包含的文章的title字段

    if (!album) {
      return res.status(404).json({message: 'Album not found'});
    }

    res.json(album);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


// 修改专辑
export const updateAlbum = async (req, res) => {
  const {name, coverImage, description} = req.body;
  const albumId = req.params.id;

  try {
    const album = await Album.findOneAndUpdate(
      {_id: albumId, createdBy: req.user._id},
      {name, coverImage, description},
      {new: true}
    );

    if (!album) {
      return res.status(404).json({message: 'Album not found'});
    }

    res.json(album);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// 删除专辑
export const deleteAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await Album.findOneAndDelete({_id: albumId, createdBy: req.user._id});

    if (!album) {
      return res.status(404).json({message: 'Album not found'});
    }

    res.json({message: 'Album deleted successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// 添加文章到专辑中
export const addArticleToAlbum = async (req, res) => {
  const {articleId} = req.body;
  const albumId = req.params.id;

  try {
    const album = await Album.findOneAndUpdate(
      {_id: albumId, createdBy: req.user._id},
      {$push: {articles: articleId}},
      {new: true}
    );

    if (!album) {
      return res.status(404).json({message: 'Album not found'});

    }
    res.json(album);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
