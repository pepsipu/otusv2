import express from 'express';
import mongoose from 'mongoose';
import { User } from '../../schema/user';
import { createRaiseError } from '../util';
import { Challenge } from '../../schema/challenge';
import { getRank } from '../../schema/leaderboard';

export default {
  routes: [(router: express.Router) => {
    router.get('/user/profile/:userId', async (req, res) => {
      const raiseError = createRaiseError(res);
      const { userId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId)
        || new mongoose.Types.ObjectId(userId).toHexString() !== userId) {
        raiseError('user id is invalid', 400);
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        raiseError('user does not exist', 404);
        return;
      }
      const {
        username, emailHash, country, badges, ctf,
      } = user;
      const challenges = (await Challenge.find({ author: user.id }, 'name categories description points'));
      res.send({
        username,
        emailHash,
        country,
        badges,
        ctf: { ...ctf, rank: await getRank(req.app.locals.redis.scoreboard, userId) },
        challenges,
        error: false,
      });
    });
  }],
};
