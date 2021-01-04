import express from 'express';
import { authenticateToken } from './../middleware/authToken.js';
import { emailValidations } from '../middleware/validateEmail.js';
import {
  sendEmail,
  saveDraft,
  toggleStarred,
  toggleRead,
  toggleTrash,
} from './../controllers/mail.js';

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.post('/', authenticateToken, [...emailValidations], sendEmail);
router.post('/drafts', authenticateToken, saveDraft);
router.put('/:id/star', authenticateToken, toggleStarred);
router.put('/:id/read', authenticateToken, toggleRead);
router.put('/:id/trash', authenticateToken, toggleTrash);

export default router;
