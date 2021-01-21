import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import { emailValidations } from '../middleware/validations.js';
import {
  getAllEmails,
  sendEmail,
  saveDraft,
  updateDraft,
  moveToTrash,
  removeFromTrash,
  toggleEmailProperty,
  deleteEmail,
} from '../controllers/email.js';

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.get('/', authenticateToken, getAllEmails);
router.post('/send', authenticateToken, [...emailValidations], sendEmail);
router.post('/draft', authenticateToken, saveDraft);
router.put('/draft/:id', authenticateToken, updateDraft);
router.put('/:id/trash', authenticateToken, moveToTrash);
router.put('/:id/untrash', authenticateToken, removeFromTrash);
router.put('/:id/:toggle', authenticateToken, toggleEmailProperty);
router.delete('/:id', authenticateToken, deleteEmail);

export default router;
