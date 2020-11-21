import joi from 'joi';
import countries from 'i18n-iso-countries';

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
  captcha: joi.string()
    .required(),
  country: joi.string()
    .custom((country: string) => {
      if (!countries.isValid(country)) {
        throw new Error('country is not a valid country');
      }
      return country;
    }, 'country code validation')
    .lowercase()
    .required(),
});

export interface RegistrationData {
  username: string,
  password: string,
  email: string,
  country: string,
  captcha: string,
}

export { registerSchema };
