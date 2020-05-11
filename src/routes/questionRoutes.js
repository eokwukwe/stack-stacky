import { Router } from 'express';

import Authentication from '../middlewares/Authentication';
import Validator from '../middlewares/validations/Validator';
import QuestionController from '../controllers/QuestionController';
import { questionSchema } from '../middlewares/validations/schemas';


const router = Router()


/**
 * @description creates a new question
 *
 * @param {string}
 * @param {function}
 */
router.post(
  '/questions',
  Authentication.verifyUser,
  Validator.validationInput(questionSchema),
  QuestionController.createNewQuestion
);

/**
 * @description get a question
 *
 * @param {string}
 * @param {function}
 */
router.get(
  '/questions/:id',
  Validator.validateIdParams,
  QuestionController.getQuestionById
);

export default router