/*const multer = require('multer').default();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });
exports.upload=upload;*/


import formidable from 'formidable';
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname)
console.log('__dirname',__dirname);
export const uploadFile = (req, res, next) => {
  console.log('path.dirname',path.resolve(path.dirname(new URL(import.meta.url).pathname)));
  console.log('process.cwd()',process.cwd());
  const form = formidable({
    multiples: true,
    uploadDir: path.resolve(path.join(process.cwd(), '/uploads')),
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    req.body = fields;
    req.files = files;
    next();
  });
};

export default uploadFile;
