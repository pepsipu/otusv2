import express from 'express';
import yaml from 'js-yaml';
import { createRaiseError } from '../util';
import { createChallenge, IChallenge } from '../../schema/challenge';

export default {
  routes: [(router: express.Router) => {
    router.post('/challenge/create', async (req, res) => {
      const raiseError = createRaiseError(res);
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
        return;
      }
      const challengeData = yaml.safeLoad(req.body.challenge) as IChallenge;
      const challenge = await createChallenge(challengeData).catch(() => false);
      if (!challenge) {
        raiseError('could not make challenge', 400);
        return;
      }
      res.send({ error: false });
    });
  }],
};
