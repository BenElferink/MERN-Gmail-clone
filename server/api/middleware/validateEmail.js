import { check } from 'express-validator';

export const emailValidations = [
  check('from', 'Email is not valid').exists().isEmail().normalizeEmail(),
  check('to', 'Email is not valid').exists().isEmail().normalizeEmail(),
  check('subject', 'Subject is required').exists(),
  check('message', 'Message is required').exists(),
];
