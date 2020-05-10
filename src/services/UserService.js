import models from '../models';
import BaseService from './BaseService';

const { User } = models;

export default class UserService extends BaseService {
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
    return User.findOne({ email }).select('-password');
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
