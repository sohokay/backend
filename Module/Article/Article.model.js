const mongoose = require('mongoose');
const {generateUUID} = require("../../middleware/uuid");
const ArticleSchema = new mongoose.Schema({
  _id: {type: String, default: generateUUID()},
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
// 预处理中间件，在保存之前自动更新 created_at 和 updated_at 字段
ArticleSchema.pre('save', function (next) {
  const now = Date.now();

  if (!this.created_at) {
    this.created_at = now;
  }

  this.updated_at = now;

  next();
});

module.exports = mongoose.model('Article', ArticleSchema);
