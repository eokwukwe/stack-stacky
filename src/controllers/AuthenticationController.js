import isEmpty from 'lodash.isempty';

import UserService from '../services/UserService';
import BcryptHelper from '../helpers/BcryptHelper';
import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';
import Authentication from '../middlewares/authentications/Authentication';

export default class AuthenticationController {
  /**
   * @description Signup
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response body object
   */
  static async signup(req, res, next) {
    const { name, username, email, password } = req.body;
    try {
      const user = await UserService.create({
        name,
        username,
        email,
        password,
      });

      return res.status(201).json({
        message: 'Singup successful',
        token: Authentication.generateToken({ id: user._id }),
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Log in
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response body object
   */
  static async login(req, res, next) {
    const { email, password } = req.body;
    const error = {
      type: responseCodes.INVALID_CREDENTIALS.type,
      code: responseCodes.INVALID_CREDENTIALS.code,
      message: 'Email or password not correct',
      field: 'email-password',
    };

    try {
      const user = await UserService.findByEmail(email);

      // check if user exist
      if (!isEmpty(user)) {
        // confirm password
        const isCorrectPassword = await BcryptHelper.verifyHash(password, user.password);

        if (isCorrectPassword) {
          const userSafeData = UserService.stripPassword(user._doc);
          return res.status(200).json({
            message: 'Log in successfull',
            data: {
              ...userSafeData,
              token: Authentication.generateToken({ id: user._id }),
            },
          });
        }
        return ErrorResponse.httpErrorResponse(res, { error }, 400);
      }

      return ErrorResponse.httpErrorResponse(res, { error }, 400);
    } catch (error) {
      return next(error);
    }
  }
}
