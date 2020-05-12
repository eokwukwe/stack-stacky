import Joi from '@hapi/joi';

const body = Joi.string().required().trim().label('answer body');

const answerSchema = Joi.object().keys({
  body,
});


export default answerSchema