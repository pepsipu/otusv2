import joi from 'joi';

const registerSchema = joi.object({
  username: joi.string()
    .min(3)
    .max(20)
    .required(),
  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  email: joi.string()
    .email()
    .trim()
    .lowercase()
    .max(30)
    .required(),
  captcha: joi.string(),
});

export interface RegistrationData {
  username: string,
  password: string,
  email: string,
  captcha: string
}

export { registerSchema };
