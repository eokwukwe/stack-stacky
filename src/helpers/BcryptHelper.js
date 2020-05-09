import bcrypt from 'bcryptjs';

/**
 *  Bcrypt Helper class
 */
export default class BcryptHelper {
  /**
   * @description Hashes a string
   *
   * @param {string} plainString
   * @returns {string} hash
   */
  static async hash(plainString) {
    const saltRounds = 10;
    return bcrypt.hash(plainString, saltRounds);
  }

  /**
   * @description Validate hashed string
   *
   * @param {string} plainString The unhashed string to be validated
   * @param {string} hashedString Previous hashed string to be compared
   * @returns {boolean}
   */
  static async verifyHash(plainString, hashedString) {
    return bcrypt.compare(plainString, hashedString);
  }
}
