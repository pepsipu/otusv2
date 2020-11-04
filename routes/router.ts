import express from 'express';
import user from './user';
import challenge from './challenge';

const routes = [
  ...user.routes,
  ...challenge.routes,
];

const router = express.Router();
routes.forEach((route: (router: express.Router) => void) => route(router));
export default router;
