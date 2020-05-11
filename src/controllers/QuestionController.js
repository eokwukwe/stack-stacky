import QuestionService from "../services/QuestionService";


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
        owner: req.user.id
      });

      return res.status(201).json({
        message: 'Question created successfully',
        data: question
      });
    } catch (error) {
      return next(error);
    }
  }
}