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

export const uploadFile = (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }

    req.body = fields;
    req.files = files;
    next();
  });
};

export default uploadFile;
