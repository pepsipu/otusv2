import joi from 'joi';

const passwordComplexity = require('joi-password-complexity');

const registerSchema = joi.object({
  username: joi.string()
    .min(3)
    .max(36)
    .required(),
  password: passwordComplexity({
    min: 7,
    max: 40,
    lowerCase: 1,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
  }).required(),
  email: joi.string()
    .email()
    .trim()
    .lowercase()
    .max(50)
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
