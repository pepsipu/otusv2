import express from 'express';
import { compare } from 'bcrypt';
import { loginSchema, LoginData } from '../../schema/user/login';
import { User } from '../../schema/user';
import { createRaiseError } from '../util';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/login', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { value, error } = loginSchema.validate(req.body);
      if (error) {
        raiseError(error.details.map((detail) => detail.message), 400);
        return;
      }
      const { username, password }: LoginData = value;
      const user = await User.findOne({ username });
      if (!user) {
        raiseError('username does not exist', 404);
        return;
      }
      if (!await compare(password, user.passwordHash)) {
        raiseError('passwords do not match', 401);
        return;
      }
      if (!req.session) {
        raiseError('server could not make a session, please report', 500);
        return;
      }
      req.session.userId = user.id;
      res.status(200);
      res.cookie('id', user.publicId);
      res.send({ error: false });
      res.end();
    });
  }],
};
