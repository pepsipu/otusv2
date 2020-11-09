import express from 'express';
import { createRaiseError } from '../util';
import { createChallenge, createChallengeSchema } from '../../schema/challenge/createChallenge';
import validRecaptcha from '../../api/recaptcha';
import { User } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.post('/challenge/create', async (req, res) => {
      const raiseError = createRaiseError(res);
      const {
        value: {
          captcha, ...challengeInformation
        }, error,
      } = createChallengeSchema.validate(req.body);
      if (error) {
        raiseError(error.details.map((detail) => detail.message), 400);
        return;
      }
      if (!await validRecaptcha(captcha)) {
        raiseError('bad captcha', 403);
        return;
      }
      if (!req.session?.userId) {
        raiseError('not logged in', 403);
        return;
      }
      const user = await User.findById(req.session.userId);
      const challenge = await createChallenge({
        author: user?.username,
        ...challengeInformation,
      }).catch(() => false);
      if (!challenge) {
        raiseError('could not make challenge', 400);
        return;
      }
      res.send({ error: false });
    });
  }],
};
