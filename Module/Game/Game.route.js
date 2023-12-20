import express from "express";
import {authenticate} from "../../middleware/passport.js";

const router = express.Router();

/**
 * @openapi
 * /game:
 *  get:
 *  summary: Hello World
 *  description: Hello World
 *  tags:
 *    - Game
 *  responses:
 *    200:
 *      description: Hello World
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: The user name.
 *                example: Hello World
 *                required: true
 *                minLength: 3
 *                maxLength: 20
 *                pattern: "^[a-zA-Z0-9_]+$"
 *                uniqueItems: true
 *
 */
router.get("/", authenticate, (req, res, next) => {
	res.send("Hello World!");
});

export default router;
