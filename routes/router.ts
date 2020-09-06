import express from 'express';
import users from './users';

const routes = [
  ...users.routes,
];

const router = express.Router();
routes.forEach((route: (router: express.Router) => void) => route(router));
export default router;
