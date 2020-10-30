import express from 'express';
import { compare } from 'bcrypt';
import { loginSchema, LoginData, login } from '../../schema/user/login';
import { User } from '../../schema/user';
import { createRaiseError } from '../util';
import validRecaptcha from '../../api/recaptcha';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/login', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { value, error } = loginSchema.validate(req.body);
      if (error) {
        raiseError(error.details.map((detail) => detail.message), 400);
        return;
      }
      const { email, password, captcha }: LoginData = value;
      if (!await validRecaptcha(captcha)) {
        raiseError('bad captcha', 403);
        return;
      }
      const user = await User.findOne({ email });
      if (!user) {
        raiseError('username does not exist', 404);
        return;
      }
      if (!await compare(password, user.passwordHash)) {
        raiseError('passwords do not match', 401);
      }
      if (!login(req, res, user)) {
        raiseError('server could not make a session, please report', 500);
      }
    });
  }],
};
