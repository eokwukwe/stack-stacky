import jwt from 'jsonwebtoken';

import config from '../config';
import isEmpty from 'lodash.isempty';

export default class JwtHelper {
  /**
   * @description Generate a token
   *
   * @param {string | object| Buffer} customer_id The id of the customer
   * @returns {string} token
   * @mwmber Authentication
   */
  static generateToken(payload) {
    if(isEmpty(payload)) {
      return false;
    }
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });
  }

  /**
   * @description This function verifies and decodes JWT tokens
   * @param {string} token
   * @returns {Object} decoded token
   */
  static verifyToken(token) {
    if (!token || typeof token !== 'string') {
      return false;
    }
    const decodedToken = jwt.verify(token, config.jwtSecret);
    return decodedToken;
  }
}
