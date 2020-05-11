import Joi from '@hapi/joi';

const title = Joi.string().required().trim().label('question title');
const body = Joi.string().required().trim().label('question body');

const questionSchema = Joi.object().keys({
  title,
  body,
});

export default questionSchema;
