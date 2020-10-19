import express from 'express';
import validRecaptcha from '../../api/recaptcha';
import { registerSchema, RegistrationData } from '../../schema/user/register';
import { createUser } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/register', async (req, res) => {
      const raiseError = (error: string | string[], statusCode: number) => {
        res.status(statusCode);
        res.send({ error });
        res.end();
      };
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
      res.status(200);
      res.send({ success: true });
      res.end();
    });
  }],
};
