import { Router } from 'express';

import models from '../models';
import Validator from '../middlewares/validations/Validator';
import Authentication from '../middlewares/Authentication';
import validationSchemas from '../middlewares/validations/schemas';
import AuthenticationController from '../controllers/AuthenticationController';

const { User } = models;
const router = Router();
const { signupSchema, loginSchema } = validationSchemas;

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
