import jwt from 'jsonwebtoken';
import isEmpty from 'lodash.isempty';

import config from '../../config';
import ErrorResponse from '../../helpers/errorResponse';

export default class Authentication {
  constructor(model) {
    this.model = model;
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  static generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });
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
      const error = {
        type: 'DuplicateRecord',
        code: 'duplication_err',
        message: 'Email or username already exist',
      };
      return ErrorResponse.httpErrorResponse(res, { error }, 409);
    }

    return next();
  }
}
