import express from 'express';
import { authenticateToken } from './../middleware/authToken.js';

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/
router.get('/', authenticateToken, (req, res) => res.status(200).send());

export default router;
