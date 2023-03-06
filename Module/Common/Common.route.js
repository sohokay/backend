import express from 'express';
// const upload = require("../../middleware/upload");
import {upload} from './Common.controller';
import {authenticate} from '../../middleware/passport';
import {uploadFile} from '../../middleware/upload';

const router = express.Router();

router.post('/upload',authenticate ,uploadFile,  (req, res, next) => upload(req, res, next));

export default router;
