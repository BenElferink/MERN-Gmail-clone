import { check } from 'express-validator';
import User from './../models/User.js';

export const registerValidations = [
  check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail()
    .custom((value) =>
      User.findOne({ email: value }).then((user) =>
        !user ? true : Promise.reject('That email is already taken'),
      ),
    ),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
  check('passwordConfirm')
    .exists()
    .custom((value, { req }) =>
      value === req.body.password ? true : Promise.reject('Passwords do not match'),
    ),
  check(['firstName', 'middleName', 'lastName'], 'Name is not valid').matches(/^[a-z ,.'-]+$/i),
];

export const loginValidations = [
  check('email', 'Email is not valid').exists().isEmail().normalizeEmail(),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
];
