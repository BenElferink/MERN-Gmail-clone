import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import { emailValidations } from '../middleware/validateEmail.js';
import {
  getEmails,
  sendEmail,
  deleteEmail,
  toggleEmailProperty,
  saveDraft,
  updateDraft,
} from '../controllers/email.js';

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.get('/', authenticateToken, getEmails);
router.post('/outbox', authenticateToken, [...emailValidations], sendEmail);
router.post('/drafts', authenticateToken, saveDraft);
router.put('/drafts/:id', authenticateToken, updateDraft);
router.put('/:id/:toggle', authenticateToken, toggleEmailProperty);
router.delete('/:id', authenticateToken, deleteEmail);

export default router;
