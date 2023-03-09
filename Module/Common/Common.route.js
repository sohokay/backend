import express from 'express';
// const upload = require("../../middleware/upload");
import {upload} from './Common.controller.js';
import {authenticate} from '../../middleware/passport.js';
import {uploadFile} from '../../middleware/upload.js';

const router = express.Router();

router.post('/upload',authenticate ,uploadFile,  (req, res, next) => upload(req, res, next));

export default router;
