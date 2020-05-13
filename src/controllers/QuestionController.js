import isEmpty from 'lodash.isempty';

import sendEmail from '../helpers/sendEmail';
import UserService from '../services/UserService';
import ErrorResponse from '../helpers/errorResponse';
import emailTemplates from '../helpers/emailTemplates';
import QuestionService from '../services/QuestionService';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { NOT_FOUND } = responseCodes;
const { answerNotify } = emailTemplates;
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
      const page = req.query.page || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const questions = await QuestionService.findAll(offset, limit);

      if (isEmpty(questions)) {
        NOT_FOUND.message = 'No questions found';
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
      const { id } = req.params;
      const answer = {
        user: req.user.id,
        body: req.body.body,
        date: new Date(),
      };

      const update = await QuestionService.updateQuestionWithAnswer(id, answer);

      // Send notification to subscribers
      if (!isEmpty(update.subscribers)) {
        const mailOptions = {
          from: answerNotify.from,
          to: update.subscribers,
          subject: answerNotify.subject,
          html: answerNotify.html(update.title),
        };

        // Simulate a simple background job
        // Defer execcution of send email to next tick.
        process.nextTick(async () => {
          await sendEmail(mailOptions);
        });
      }

      return res.status(200).json({
        message: 'Answer submitted successfully',
        data: update,
      });
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
      const { id } = req.params;
      const upvote = await QuestionService.updateQuestionWithUpvote(id);

      return res.status(200).json({
        message: 'Question upvoted',
        data: upvote,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description downvote a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async downvote(req, res, next) {
    try {
      const { id } = req.params;
      const downvote = await QuestionService.updateQuestionWithDownvote(id);

      return res.status(200).json({
        message: 'Question downvoted',
        data: downvote,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description search questions
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async searchQuestion(req, res, next) {
    try {
      const { text } = req.query;

      const search = await QuestionService.searchQuestion(text);

      if (isEmpty(search)) {
        NOT_FOUND.message = 'Your search did not match any documents';
        return ErrorResponse.httpErrorResponse(res, NOT_FOUND, 404);
      }

      return res.status(200).json({
        message: 'Search results',
        data: search,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description subscribe to a question
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async subscribeToQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const { email } = await UserService.findById(req.user.id);

      await QuestionService.subscribeToQuestion(id, email);

      return res.status(200).json({
        message: 'Subscription successfull.',
      });
    } catch (error) {
      return next(error);
    }
  }
}
