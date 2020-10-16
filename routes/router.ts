import express from 'express';
import users from './user';

const routes = [
  ...users.routes,
];

const router = express.Router();
routes.forEach((route: (router: express.Router) => void) => route(router));
console.log(router);
export default router;
