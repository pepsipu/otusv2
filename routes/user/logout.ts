import express from 'express';
import { createRaiseError } from '../util';

export default {
  routes: [(router: express.Router) => {
    router.post('/user/logout', async (req, res) => {
      const raiseError = createRaiseError(res);
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
        return;
      }
      req.session.userId = null;
      res.status(200);
      res.send({ error: false });
      res.end();
    });
  }],
};
