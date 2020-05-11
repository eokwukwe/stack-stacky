import jwt from 'jsonwebtoken';
import isEmpty from 'lodash.isempty';

import config from '../config';
import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';

export default class Authentication {
  constructor(model) {
    this.model = model;
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  /**
   * @description Generate a token
   *
   * @param {string | object| Buffer} customer_id The id of the customer
   * @returns {string} token
   * @mwmber Authentication
   */
  static generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });
  }

  /**
   * @description Verify a token
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} Server Response
   */
  static async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if(!token){
        return ErrorResponse.httpErrorResponse(
          res,
          responseCodes.UNAUTHORIZED_ACCESS,
          401
        )
      }

      const userToken = token.split(' ')[1];
      const decodeToken = jwt.verify(userToken, config.jwtSecret);
      req.user = decodeToken;

      return next()
    } catch (error) {
      responseCodes.UNAUTHORIZED_ACCESS.message = 'Invalid token'
      return ErrorResponse.httpErrorResponse(
        res,
        responseCodes.UNAUTHORIZED_ACCESS,
        400
      )
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
      return ErrorResponse.httpErrorResponse(
        res,
        responseCodes.DUPLICATE_RECORD,
        409
      );
    }

    return next();
  }
}
