import express from 'express';
import { createRaiseError } from '../util';
import { Challenge } from '../../schema/challenge';
import { User } from '../../schema/user';

export default {
  routes: [(router: express.Router) => {
    router.post('/challenge/submit/:challengeId', async (req, res) => {
      const raiseError = createRaiseError(res);
      const userId = req.session?.userId;
      if (!userId) {
        raiseError('not logged in', 403);
        return;
      }
      const { flag } = req.body;
      const { challengeId } = req.params;
      if (!flag || typeof flag !== 'string') {
        raiseError('bad flag', 400);
        return;
      }
      const challenge = await Challenge.findById(challengeId, 'flag points');
      if (challenge === null) {
        raiseError('challenge does not exist', 404);
        return;
      }
      if (flag !== challenge.flag) {
        res.send({ ok: false, reason: 'incorrect!' });
        return;
      }

      if (await Challenge.exists({
        _id: challengeId,
        'solves.playerId': userId,
      })) {
        res.send({ ok: false, reason: 'already solved!' });
        return;
      }
      const { redis } = req.app.locals;

      await Challenge.findByIdAndUpdate(challengeId, {
        $push: {
          solves: userId,
        },
      });

      const pointsGained = challenge.points === -1 ? 0 : challenge.points;
      await User.findByIdAndUpdate(userId, {
        $push: {
          'ctf.solves': {
            challenge: challengeId,
            timestamp: new Date(),
            rank: redis.scoreboard.getRank(userId),
          },
        },
        $inc: {
          'ctf.pp': pointsGained,
        },
      });
      await redis.scoreboard.updateUser(userId, pointsGained);
      res.send({ ok: true });
    });
  }],
};
