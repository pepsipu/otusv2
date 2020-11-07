import express from 'express';
import { User } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.get('/user/profile/:publicId', async (req, res) => {
      const { publicId } = req.params;
      const user = await User.findOne({ publicId });
      if (!user) {
        res.status(404);
        return;
      }
      const { username, emailHash } = user;
      res.send({ username, emailHash, error: false });
    });
  }],
};
