import isEmpty from 'lodash.isempty';

import ErrorResponse from '../helpers/errorResponse';
import QuestionService from '../services/QuestionService';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { NOT_FOUND } = responseCodes;
export default class AuthenticationController {
  /**
   * @description Create a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async createNewQuestion(req, res, next) {
    const { title, body } = req.body;
    try {
      const question = await QuestionService.create({
        title,
        body,
        owner: req.user.id,
      });

      return res.status(201).json({
        message: 'Question created successfully',
        data: question,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description get a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async getQuestionById(req, res, next) {
    try {
      const question = await QuestionService.findById(req.params.id);

      if (!question) {
        NOT_FOUND.message = 'Resource with that ID not found';
        return ErrorResponse.httpErrorResponse(res, NOT_FOUND, 404);
      }

      return res.status(200).json({ data: question });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description get all questions
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async getAllQuestions(req, res, next) {
    try {
      const questions = await QuestionService.findAll();

      if (isEmpty(questions)) {
        NOT_FOUND.message = 'No questions founds';
        return ErrorResponse.httpErrorResponse(res, NOT_FOUND, 404);
      }

      return res.status(200).json({ data: questions });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description answer a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async answer(req, res, next) {
    try {
      const {id } = req.params
      const answer = {
        user: req.user.id,
        body: req.body.body,
        date: new Date()
      }

      const update = await QuestionService.updateQuestionWithAnswer(id, answer)
      return res.status(200).json({
        message: 'Answer submitted successfully',
        data: update
      })
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description upvote a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async upvote(req, res, next) {
    try {
      const {id } = req.params
      const upvote = await QuestionService.updateQuestionWithUpvote(id)

      return res.status(200).json({
        message: 'Question upvoted',
        data: upvote
      })
    } catch (error) {
      return next(error);
    }
  }
}
