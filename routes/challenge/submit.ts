import express from 'express';
import { createRaiseError } from '../util';
import { Challenge } from '../../schema/challenge';

export default {
  routes: [(router: express.Router) => {
    router.post('/challenge/submit/:challengeId', async (req, res) => {
      const raiseError = createRaiseError(res);
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
        return;
      }
      const { flag } = req.body;
      const { challengeId } = req.params;
      if (!flag || typeof flag !== 'string') {
        raiseError('bad flag', 400);
        return;
      }
      const challenge = await Challenge.findById(challengeId, 'flag');
      if (challenge === null) {
        raiseError('challenge does not exist', 404);
        return;
      }
      if (flag !== challenge.flag) {
        res.send({ ok: false });
        return;
      }
      // insert gaming here
      res.send({ ok: true });
    });
  }],
};
