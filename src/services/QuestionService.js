import models from '../models';
import BaseService from './BaseService';
import isEmpty from 'lodash.isempty';

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
    return QuestionService.formatQueryResult(question._doc);
  }

  /**
   * @description Find a question by id
   *
   * @param {ObjectId} id
   * @return {Promise} question
   */
  static async findById(id) {
    const question = await Question.findById(id);
    if (isEmpty(question)) {
      return false;
    }
    return QuestionService.formatQueryResult(question);
  }

  /**
   * @description Find all questions
   *
   * @return {Promise} question
   */
  static async findAll(offset = null, limit = null) {
    const data = await Question.find().skip(offset).limit(limit).sort({ createdAt: -1 }).exec();

    const questions = data.map((q) => QuestionService.formatQueryResult(q));
    return questions;
  }

  /**
   * @description Update a questions with answer
   *
   * @param {ObjectId} id
   * @param {Object} answer
   * @return {Promise} question
   */
  static async updateQuestionWithAnswer(id, answer) {
    const updated = await Question.findOneAndUpdate(
      { _id: id },
      { $push: { answers: answer } },
      { new: true }
    );

    return QuestionService.formatQueryResult(updated);
  }

  /**
   * @description Update a questions with upvote
   *
   * @param {ObjectId} id
   * @return {Promise} question
   */
  static async updateQuestionWithUpvote(id) {
    const upvote = await Question.findOneAndUpdate(
      { _id: id },
      { $inc: { votes: 1 } },
      { new: true }
    );

    return QuestionService.formatQueryResult(upvote);
  }

  /**
   * @description Update a questions with downvote
   *
   * @param {ObjectId} id
   * @return {Promise} question
   */
  static async updateQuestionWithDownvote(id) {
    const downvote = await Question.findOneAndUpdate(
      { _id: id },
      { $inc: { votes: -1 } },
      { new: true }
    );

    return QuestionService.formatQueryResult(downvote);
  }

  static async subscribeToQuestion(id, subscriberEmail) {
    const subscribed = await Question.findOneAndUpdate(
      { _id: id },
      { $addToSet: { subscribers: subscriberEmail } },
      { new: true }
    );

    return QuestionService.formatQueryResult(subscribed);
  }

  /**
   * @description search questions
   * @param {string} search text
   * @param {integer} limit
   * @param {integer} offset
   * @return {array} questions
   */
  static async searchQuestion(searchText, offset = null, limit = null) {
    const search = await Question.find({ $text: { $search: searchText } })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return search.map((s) => QuestionService.formatQueryResult(s));
  }

  static formatQueryResult(data) {
    const formatted = {
      _id: data._id,
      title: data.title,
      body: data.body,
      owner: data.owner,
      votes: data.votes,
      answers: data.answers.map((ans) => ({
        _id: ans._id,
        body: ans.body,
        user: ans.user,
        date: ans.date,
      })),
      subscribers: data.subscribers,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return formatted;
  }
}
