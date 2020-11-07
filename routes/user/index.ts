import register from './register';
import login from './login';
import logout from './logout';
import profile from './profile';

export default {
  routes: [
    ...register.routes, ...login.routes, ...logout.routes, ...profile.routes,
  ],
};
