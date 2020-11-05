import express from 'express';
import { createRaiseError } from '../util';
import { User } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.get('/user/profile/:publicId', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { publicId } = req.params;
      const user = await User.findOne({ publicId });
      if (!user) {
        raiseError('not_found', 404);
        return;
      }
      const { username } = user;
    });
  }],
};
