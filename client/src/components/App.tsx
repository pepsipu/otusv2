import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Navbar from './ui/Navbar';
import './App.css';
import Home from './Home';
import Profile from './user/Profile';
import NotFound from './NotFound';
import Register from './user/Register';
import Logout from './user/Logout';
import Login from './user/Login';
import Challenges from './challenges/Challenges';

enum UserType {
  AnonUser,
  RegisteredUser,
}

const paths = [
  {
    name: 'home',
    path: '/home',
    component: Home,
    nav: () => true,
    route: () => true,
    user: false,
  },
  {
    name: 'challenges',
    path: '/challenges',
    component: Challenges,
    nav: (userType: UserType) => userType === UserType.RegisteredUser,
    route: () => true,
    user: false,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    nav: (userType: UserType) => userType === UserType.AnonUser,
    route: () => true,
    user: false,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    nav: (userType: UserType) => userType === UserType.AnonUser,
    route: () => true,
    user: false,
  },
  {
    name: 'profile',
    path: '/profile/:userId/:category',
    component: Profile,
    nav: () => false,
    route: () => true,
    user: false,
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout,
    nav: () => false,
    route: (userType: UserType) => userType === UserType.RegisteredUser,
    user: true,
  },
];

// too lazy to check if null so dont use ReactCookieProps
export default withCookies((props) => {
  const { cookies } = props;
  const userType = cookies?.get('username') ? UserType.RegisteredUser : UserType.AnonUser;
  const navPaths = paths.filter(({ nav }) => nav(userType));
  const routePaths = paths.filter(({ route }) => route(userType));
  const userOptions = paths.filter(({ user }) => user);
  return (
    <>
      <Navbar
        paths={navPaths.map(({ name, path }) => [name, path])}
        userOptions={userOptions.map(({ name, path }) => [name, path])}
      />
      <Switch>
        {routePaths.map(({ path, component }) => <Route key={path} path={path} component={component} />)}
        <Route component={NotFound} />
      </Switch>
    </>
  );
});
