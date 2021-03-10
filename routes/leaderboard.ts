import express from 'express';
import { User } from '../schema/user';

const ENTRIES_PER_PAGE = 20;

export default {
  routes: [(router: express.Router) => {
    router.get('/rankings/:page', async (req, res) => {
      const page = +req.params.page || 0;
      const { scoreboard } = req.app.locals.redis;
      const users = await User.find({
        _id: {
          $in: await scoreboard.getRankRange(
            page * ENTRIES_PER_PAGE, (page + 1) * ENTRIES_PER_PAGE,
          ),
        },
      }, 'username country');
      res.send({ users });
      res.end();
    });
  }],
};
