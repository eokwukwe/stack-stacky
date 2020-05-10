import { Router } from 'express';

import models from '../models';
import Validator from '../middlewares/validations/Validator';
import { signupSchema } from '../middlewares/validations/schemas';
import Authentication from '../middlewares/authentications/Authentication';
import AuthenticationController from '../controllers/AuthenticationController';

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
  AuthenticationController.singup
);

export default router;
