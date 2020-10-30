import register from './register';
import login from './login';
import logout from './logout';

export default { routes: [...register.routes, ...login.routes, ...logout.routes] };
