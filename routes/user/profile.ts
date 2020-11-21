import express from 'express';
import { User } from '../../schema/user';
import { createRaiseError } from '../util';

export default {
  routes: [(router: express.Router) => {
    router.get('/user/profile/:publicId', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { publicId } = req.params;
      const user = await User.findOne({ publicId });
      if (!user) {
        raiseError('user does not exist', 404);
        return;
      }
      const { username, emailHash, country } = user;
      res.send({
        username, emailHash, country, error: false,
      });
    });
  }],
};
