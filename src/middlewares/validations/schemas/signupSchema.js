import Joi from '@hapi/joi';

const name = Joi.string().required().min(4).trim().label('name');
const username = Joi.string().required().min(5).trim().label('username');
const email = Joi.string().email().required().trim().lowercase().label('email');
const password = Joi.string().min(5).required().trim().label('password');

const signupSchema = Joi.object().keys({
  name,
  username,
  email,
  password,
});


export default signupSchema