exports.upload = async (req, res) => {
  /*对文件做处理 保存到./upload/目录下 */

  const { file } = req.files;
  console.log(file.name, file.path, file.type);


  console.log(111);

  console.log(file);
  console.log(JSON.stringify(req.body));
  if (!file) {
    return res.status(400).json({message: 'No file uploaded'});
  }
  console.log(file);
  res.json({ message: 'File uploaded successfully'});
}
