// 查找是否存在和鉴权 统一处理
const Article = require("./Article.model");
exports.checkArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({message: 'Article not found'});
    }
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({message: 'Unauthorized'});
    }
    req.article = article;
    next();
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
