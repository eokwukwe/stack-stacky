import isEmpty from 'lodash.isempty';

import JwtHelper from '../helpers/JwtHelper';
import UserService from '../services/UserService';
import BcryptHelper from '../helpers/BcryptHelper';
import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { INVALID_CREDENTIALS } = responseCodes;
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
        token: JwtHelper.generateToken({ id: user._id }),
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
              token: JwtHelper.generateToken({ id: user._id }),
            },
          });
        }

        return ErrorResponse.httpErrorResponse(res, INVALID_CREDENTIALS, 400);
      }

      return ErrorResponse.httpErrorResponse(res, INVALID_CREDENTIALS, 400);
    } catch (error) {
      return next(error);
    }
  }
}
