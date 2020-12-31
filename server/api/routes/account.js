import express from 'express';
import { authenticateToken } from './../middleware/authToken.js';
import { registerValidations, loginValidations } from './../middleware/validateUser.js';
import { registerController, loginController, getUserById } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/
router.post('/register', [...registerValidations], registerController);
router.post('/login', [...loginValidations], loginController);
router.get('/', authenticateToken, getUserById);

export default router;
