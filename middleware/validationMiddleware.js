import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import User from '../models/UserModel.js';
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        // Custom Errors
        if (errorMessages[0].startsWith('no task')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not unauthorized')) {
          throw new UnauthorizedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage('enter valid email')
    .custom(async (email) => {
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        throw new BadRequestError('email id is already present');
      }
    }),
  body('name').notEmpty().withMessage("name can't be empty").trim(),
  body('password').notEmpty().withMessage("password can't be empty"),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage('enter valid email'),
  body('password').notEmpty().withMessage("password can't be empty"),
]);

export const validateTaskInput = withValidationErrors([
  body('taskName')
    .notEmpty()
    .withMessage('task is required')
    .isLength({ min: 5 })
    .withMessage('Task name should be min 5 letters long..')
    .trim(),
  body('dueDate')
    .notEmpty()
    .withMessage('date is required')
    .isDate()
    .withMessage('date is required'),
]);

export const validateParams = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) {
      throw new BadRequestError('invalid mongo Id');
    }

    const task = await User.findOne({ 'tasks._id': value });
    if (!task) {
      throw new NotFoundError('no task Found');
    }

    const isUser = req.user.userId === task._id.toString();
    if (!isUser)
      throw new UnauthorizedError('not unauthorized to perform this action');
  }),
]);
