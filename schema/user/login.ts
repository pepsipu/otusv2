import joi from 'joi';
import { IUser } from './index';

const loginSchema = joi.object({
  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  email: joi.string()
    .email()
    .max(30)
    .required(),
  captcha: joi.string(),
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
    id, publicId, username, email,
  } = user;
  req.session.userId = id;
  res.status(200);
  res.cookie('id', publicId);
  res.cookie('username', username);
  res.cookie('email', email);
  res.send({ error: false });
  return true;
};

export { loginSchema, login };
