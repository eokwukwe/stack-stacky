import { Router } from 'express';

import models from '../models'
import Authentication from '../middlewares/Authentication';
import Validator from '../middlewares/validations/Validator';
import QuestionController from '../controllers/QuestionController';
import validationSchemas from '../middlewares/validations/schemas';
import checkIfRecordExists from '../middlewares/checkIfRecordExists';


const router = Router();
const { Question } = models;
const { questionSchema, answerSchema } = validationSchemas


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

// /**
//  * @description search questions
//  *
//  * @param {string}
//  * @param {function}
//  */
// router.get(
//   '/questions/search',
//   QuestionController.searchQuestion
// );

/**
 * @description get all questions
 *
 * @param {string}
 * @param {function}
 */
router.get(
  '/questions',
  QuestionController.getAllQuestions
);

/**
 * @description search questions
 *
 * @param {string}
 * @param {function}
 */
router.get(
  '/questions/search',
  QuestionController.searchQuestion
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

/**
 * @description answer a question
 *
 * @param {string}
 * @param {function}
 */
router.put(
  '/questions/:id/answers',
  Authentication.verifyUser,
  Validator.validateIdParams,
  checkIfRecordExists(Question),
  Validator.validationInput(answerSchema),
  QuestionController.answer
);

/**
 * @description upvote a question
 *
 * @param {string}
 * @param {function}
 */
router.put(
  '/questions/:id/upvotes',
  Authentication.verifyUser,
  Validator.validateIdParams,
  checkIfRecordExists(Question),
  QuestionController.upvote
);

/**
 * @description downvote a question
 *
 * @param {string}
 * @param {function}
 */
router.put(
  '/questions/:id/downvotes',
  Authentication.verifyUser,
  Validator.validateIdParams,
  checkIfRecordExists(Question),
  QuestionController.downvote
);


export default router