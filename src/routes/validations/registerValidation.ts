import { body } from 'express-validator';

export default [
  body('name').trim().notEmpty().withMessage('Name is required!'),
  body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Email is invalid!'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password length at least 8 characters!'),
  body('provider')
    .trim()
    .isIn(['email', 'google'])
    .withMessage('Provider is invalid!')
    .notEmpty()
    .withMessage('Provider is required!')
];
