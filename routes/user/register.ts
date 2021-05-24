import express from 'express';
import validRecaptcha from '../../api/recaptcha';
import { registerSchema, RegistrationData } from '../../schema/user/register';
import { createUser } from '../../schema/user';
import { createRaiseError } from '../util';
import { login } from '../../schema/user/login';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/register', async (req, res) => {
      const { redis } = req.app.locals;
      const raiseError = createRaiseError(res);
      const { value, error } = registerSchema.validate(req.body);
      if (error) {
        raiseError(error.details.map((detail) => detail.message), 400);
        return;
      }
      const {
        username, email, password, country, captcha,
      }: RegistrationData = value;
      if (!await validRecaptcha(captcha)) {
        raiseError('bad captcha', 403);
        return;
      }
      const user = await createUser(username, password, email, country);
      if (!user) {
        raiseError('duplicate email or username', 403);
        return;
      }
      await redis.scoreboard.addUser(user.id);
      if (!login(req, res, user)) {
        raiseError('server could not make a session, please report', 500);
      }
    });
  }],
};
