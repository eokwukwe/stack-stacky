import jwt from 'jsonwebtoken';
import isEmpty from 'lodash.isempty';

import JwtHelper from '../helpers/JwtHelper';
import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { UNAUTHORIZED_ACCESS, DUPLICATE_RECORD } = responseCodes;

export default class Authentication {
  constructor(model) {
    this.model = model;
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  /**
   * @description Verify a token
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} Server Response
   */
  static async verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return ErrorResponse.httpErrorResponse(res, UNAUTHORIZED_ACCESS, 401);
      }

      const userToken = token.split(' ')[1];
      const decodeToken = JwtHelper.verifyToken(userToken);
      req.user = decodeToken;

      return next();
    } catch (error) {
      UNAUTHORIZED_ACCESS.message = 'Invalid token';
      return ErrorResponse.httpErrorResponse(res, UNAUTHORIZED_ACCESS, 400);
    }
  }

  /**
   * @descripion Check user collections if an email already exists
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns duplication error
   */
  async checkUserExists(req, res, next) {
    const { email, username } = req.body;
    const emailExists = await this.model.findOne({ email }, 'email');
    const usernameExists = await this.model.findOne({ username }, 'username');

    if (!isEmpty(emailExists) || !isEmpty(usernameExists)) {
      return ErrorResponse.httpErrorResponse(res, DUPLICATE_RECORD, 409);
    }

    return next();
  }
}
