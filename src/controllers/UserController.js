import isEmpty from 'lodash.isempty';

import UserService from '../services/UserService';
import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { NOT_FOUND } = responseCodes;

export default class UserController {
  /**
   * @description search users
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} response body object
   */
  static async searchUser(req, res, next) {
    try {
      const { name } = req.query;

      const search = await UserService.searchUser(name);

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
}
