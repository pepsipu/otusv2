import express from 'express';
import { createRaiseError } from '../util';
import { Challenge } from '../../schema/challenge';

export default {
  routes: [(router: express.Router) => {
    router.get('/challenge/get', async (req, res) => {
      const raiseError = createRaiseError(res);
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
      }
      const challenges = await Challenge.find({ points: { $ne: -1 } }, 'name categories description points');
      res.send({ challenges });
    });
  }],
};
