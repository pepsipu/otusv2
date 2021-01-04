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
      // aggregation pipeline will fetch challenges and resolve the author of the challenge
      const challenges = await Challenge.aggregate([
        { $match: { points: { $ne: -1 } } },
        {
          $lookup: {
            from: 'users', localField: 'author', foreignField: '_id', as: 'author',
          },
        },
        {
          $sort: {
            points: -1,
            _id: 1,
          },
        },
        {
          $addFields: {
            author: { $arrayElemAt: ['$author', 0] },
          },
        },
        {
          $project: {
            name: true,
            categories: true,
            description: true,
            points: true,
            author: {
              username: true,
              _id: true,
            },
          },
        },
      ]);
      res.send({ challenges });
    });
  }],
};
