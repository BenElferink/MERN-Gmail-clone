import { body } from 'express-validator';

export const registerValidations = [
  body(['firstName', 'lastName'], 'Name is not valid')
    .exists()
    .matches(/^[a-z ,.'-]+$/i),
  body('middleName', 'Name is not valid')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^[a-z ,.'-]+$/i),
  body('email', 'Email is not valid').exists().isEmail(),
  body('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
  body('passwordConfirm')
    .exists()
    .custom((value, { req }) =>
      value === req.body.password ? true : Promise.reject('Passwords do not match'),
    ),
];

export const loginValidations = [
  body('email', 'Email is not valid').exists().isEmail(),
  body('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
];

export const emailValidations = [
  body('from', 'Email is not valid').exists().isEmail(),
  body('to', 'Email is not valid').exists().isEmail(),
  body('subject', 'Subject is required').exists(),
  body('message', 'Message is required').exists(),
];
