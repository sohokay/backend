import express from "express";
import {authenticate} from "../../middleware/passport.js";

const router = express.Router();

router.get("/", authenticate, (req, res, next) => {
  res.send("Hello World!");
} );

export default router;
