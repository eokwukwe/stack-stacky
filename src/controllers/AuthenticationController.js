import UserService from '../services/UserService';
import Authentication from '../middlewares/authentications/Authentication';

export default class AuthenticationController {
  /**
   * @description Method for user registration
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response body object
   */
  static async singup(req, res, next) {
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
}
