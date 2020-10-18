import express from 'express';
import validRecaptcha from '../../api/recaptcha';
import { registerSchema, RegistrationData } from '../../schema/user/register';
import { createUser } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/register', async (req, res) => {
      const { value, error } = registerSchema.validate(req.body);
      if (error) {
        res.send({ error });
        return;
      }
      const {
        username, email, password, captcha,
      }: RegistrationData = value;
      if (!await validRecaptcha(captcha)) {
        res.send({ error: 'bad captcha' });
        return;
      }
      const user = await createUser(username, password, email);
      if (!user) {
        res.send({ error: 'duplicate username or email' });
        return;
      }
      res.send({ success: true });
    });
  }],
};
