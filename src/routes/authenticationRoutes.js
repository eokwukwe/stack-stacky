import { Router } from 'express';

import models from '../models';
import Validator from '../middlewares/validations/Validator';
import Authentication from '../middlewares/Authentication';
import AuthenticationController from '../controllers/AuthenticationController';
import { signupSchema, loginSchema } from '../middlewares/validations/schemas';

const { User } = models;
const router = Router();

const userExists = new Authentication(User);

/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post(
  '/signup',
  Validator.validationInput(signupSchema),
  userExists.checkUserExists,
  AuthenticationController.signup
);

/**
 * @description log in user
 * @param {string}
 * @param {function}
 */
router.post(
  '/login',
  Validator.validationInput(loginSchema),
  AuthenticationController.login
);

export default router;
