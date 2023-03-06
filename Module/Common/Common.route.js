const express = require('express');
// const upload = require("../../middleware/upload");
const CommonController = require('./Common.controller');
const {authenticate} = require("../../middleware/passport");
const {uploadFile} = require("../../middleware/upload");

const router = express.Router();

router.post('/upload',authenticate ,uploadFile,  (req, res, next) => CommonController.upload(req, res, next));

module.exports = router;
