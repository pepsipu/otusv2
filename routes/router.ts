import express from 'express';
import user from './user';
import challenge from './challenge';
import leaderboard from './leaderboard';

const routes = [
  ...user.routes,
  ...challenge.routes,
  ...leaderboard.routes,
];

const router = express.Router();
routes.forEach((route: (router: express.Router) => void) => route(router));
export default router;
