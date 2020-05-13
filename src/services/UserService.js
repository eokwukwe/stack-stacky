import models from '../models';

const { User } = models;

export default class UserService {
  /**
   * @description Create a new user document
   *
   * @param {object} payload
   * @return {Promise} user
   */
  static async create(payload) {
    const user = await User.create(payload);
    return UserService.stripPassword(user._doc);
  }

  /**
   * @description Find a user by email
   *
   * @param {string} email
   * @return {Promise} user
   */
  static async findByEmail(email) {
    return User.findOne({ email });
  }

  /**
   * @description Find a user by id
   *
   * @param {string} id
   * @return {Promise} user
   */
  static async findById(id) {
    return User.findById(id).select('-password');
  }

  /**
   * @description search users by name or username
   *
   * @param {string} search term
   * @return {array} users
   */
  static async searchUser(searchTerm) {
    const re = new RegExp(`^${searchTerm}`, 'i');
    return await User.find()
      .or([{ name: { $regex: re } }, { username: { $regex: re } }])
      .sort({ createdAt: 1 })
      .select('_id name username')
      .exec();
  }

  /**
   * @description strips the password, createdAt and updatedAt fields
   *
   * @param {object} userData
   * @returns {object} user object without password
   */
  static stripPassword(data) {
    const { password, __v, ...newUserObject } = data;
    return newUserObject;
  }
}
