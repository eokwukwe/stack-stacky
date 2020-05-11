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

  static async getQuestionById(req, res, next) {
    try {
      const question = await QuestionService.findById(req.params.id);

      if (isEmpty(question)) {
        return ErrorResponse.httpErrorResponse(res, NOT_FOUND, 404);
      }

      return res.status(200).json({ data: question });
    } catch (error) {
      return next(error);
    }
  }
}
