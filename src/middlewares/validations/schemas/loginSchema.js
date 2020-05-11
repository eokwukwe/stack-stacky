import Joi from '@hapi/joi';

const email = Joi.string().email().required().trim().lowercase().label('email');
const password = Joi.string().required().trim().label('password');

const signinSchema = Joi.object().keys({
  email,
  password,
});


export default signinSchema