import express from 'express';
import { registerValidations, loginValidations } from './../middleware/validateUser.js';
import { registerController, loginController } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/
router.post('/register', [...registerValidations], registerController); // current path: http://localhost:8080/api/v1/example
router.post('/login', [...loginValidations], loginController); // current path: http://localhost:8080/api/v1/example/upload

export default router;
