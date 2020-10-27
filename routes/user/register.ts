import express from 'express';
import { createHash } from 'crypto';
import validRecaptcha from '../../api/recaptcha';
import { registerSchema, RegistrationData } from '../../schema/user/register';
import { createUser } from '../../schema/user';
import { createRaiseError } from '../util';

const sha1 = createHash('sha1');

export default {
  routes: [(router: express.Router) => {
    router.post('/user/register', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { value, error } = registerSchema.validate(req.body);
      if (error) {
        raiseError(error.details.map((detail) => detail.message), 400);
        return;
      }
      const {
        username, email, password, captcha,
      }: RegistrationData = value;
      if (!await validRecaptcha(captcha)) {
        raiseError('bad captcha', 403);
        return;
      }
      const user = await createUser(username, password, email);
      if (!user) {
        raiseError('duplicate email or username', 403);
        return;
      }
      if (!req.session) {
        raiseError('server could not make a session, please report', 500);
        return;
      }
      req.session.userId = user.id;
      res.status(200);
      // it does not matter what the hash algo is, as long as we conceal the id
      res.send({ id: sha1.update(user.id).digest('hex') });
      res.end();
    });
  }],
};
