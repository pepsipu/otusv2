import joi from 'joi';
import { IUser } from './index';

const passwordComplexity = require('joi-password-complexity');

const loginSchema = joi.object({
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
});

export interface LoginData {
  password: string,
  email: string,
  captcha: string,
}

const login = (req: any, res: any, user: IUser): boolean => {
  if (!req.session) {
    return false;
  }
  const {
    id, username, email,
  } = user;
  req.session.userId = id;
  res.status(200);
  res.cookie('id', id);
  res.cookie('username', username);
  res.cookie('email', email);
  res.send({ error: false });
  return true;
};

export { loginSchema, login };
