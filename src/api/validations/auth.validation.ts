import Joi from 'joi';

export default {
  // POST /v1/auth/register
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128)
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128)
  })
};
