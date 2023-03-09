import Article from "./Article.model.js";
import mongoose from "mongoose";

const create = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author:  req.user._id,
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.user._id
    const articles = await Article.find({author: userId})
        .populate('author')
    res.json(articles);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author');
    if (!article) {
      return res.status(404).json({message: 'Article not found'});
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updateById = async (req, res) => {
  try {
    const article = req.article;
    article.title = req.body.title;
    article.content = req.body.content;
    article.updatedAt = Date.now();
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const deleteById = async (req, res) => {
  try {
    const article = req.article;
    const author = article.author;
    await Article.deleteOne({_id: author._id});
    res.json({message: '删除成功！'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById

}
