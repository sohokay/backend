export const upload = async (req, res) => {
  /*对文件做处理 保存到./upload/目录下 */
const {file} = req.files;

  console.log( req.files);
  console.log( req.body);
  if (!file) {
    return res.status(400).json({message: 'No file uploaded'});
  }
  console.log(file);
  res.json({ message: 'File uploaded successfully'});
}
