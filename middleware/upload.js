import formidable from 'formidable';
import path from "path";
import __dirname from '../utils/dirname.js';
console.log('__dirname',__dirname);
export const uploadFile = (req, res, next) => {
  console.log('path.dirname',path.resolve(path.dirname(new URL(import.meta.url).pathname)));
  console.log('process.cwd()',process.cwd());
  const form = formidable({// 上传文件配置
    multiples: true,// 多文件上传
    uploadDir: path.resolve(path.join(process.cwd(), '/uploads')),// 上传文件目录
    keepExtensions: true,// 保留文件后缀
    keepFileNames: true// 保留文件名
  });
  form.parse(req, (err, fields, files) => {// 解析 formData 数据
    if (err) {// 处理错误
      console.log(err);// 打印错误日志
      return next(err);// 抛出错误
    }

    req.body = fields;// 将 formData 数据存入 req.body
    req.files = files;// 将上传文件信息存入 req.files
    next();// 继续下一步
  });
};

export default uploadFile;
