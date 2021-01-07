import { check } from 'express-validator';

export const registerValidations = [
  check(['firstName', 'lastName'], 'Name is not valid')
    .exists()
    .matches(/^[a-z ,.'-]+$/i),
  check('middleName', 'Name is not valid')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^[a-z ,.'-]+$/i),
  check('email', 'Email is not valid').exists().isEmail(),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
  check('passwordConfirm')
    .exists()
    .custom((value, { req }) =>
      value === req.body.password ? true : Promise.reject('Passwords do not match'),
    ),
];

export const loginValidations = [
  check('email', 'Email is not valid').exists().isEmail(),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
];
