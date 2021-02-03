import express from 'express';
import { authenticateToken } from './../middleware/authToken.js';
import { registerValidations, loginValidations } from '../middleware/validations.js';
import { register, login, getUser, updateProfilePicture } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/
router.post('/register', [...registerValidations], register);
router.post('/login', [...loginValidations], login);
router.get('/', authenticateToken, getUser);
router.put('/image', authenticateToken, updateProfilePicture);

export default router;
