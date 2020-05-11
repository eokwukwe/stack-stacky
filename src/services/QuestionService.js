import models from '../models';
import BaseService from './BaseService';

const { Question } = models;

export default class QuestionService extends BaseService {
  /**
   * @description Create a new question document
   *
   * @param {object} payload
   * @return {Promise} question
   */
  static async create(payload) {
    const question = await Question.create(payload);
    return question._doc;
  }
  /**
   * @description Find a question by id
   *
   * @param {string} id
   * @return {Promise} question
   */
  static async findById(id) {
    return Question.findById(id);
  }
}
