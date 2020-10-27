import express from 'express';
import { User } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/logout', async (req, res) => {
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
        return;
      }
      req.session.userId = res.end();
    });
  }],
};
