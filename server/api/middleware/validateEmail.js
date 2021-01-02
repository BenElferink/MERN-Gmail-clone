import { check } from 'express-validator';

export const emailValidations = [
  check('from', 'Email is not valid').exists().isEmail(),
  check('to', 'Email is not valid').exists().isEmail(),
  check('subject', 'Subject is required').exists(),
  check('message', 'Message is required').exists(),
];
