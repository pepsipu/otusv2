import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import NavbarNoCookie from './ui/Navbar';
import './App.css';
import 'bootstrap-4-grid';
import Home from './Home';
import Profile from './user/Profile';
import NotFound from './NotFound';
import Register from './user/Register';

const Navbar = withCookies(NavbarNoCookie);

const anonPath = [
  {
    name: 'register',
    path: '/register',
    component: withCookies(Register),
  },
];

const userPath = [
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  },
];

const defaultPaths = [
  {
    name: 'home',
    path: '/home',
    component: withCookies(Home),
  },
];

export default (props: { cookies: any }) => {
  const { cookies } = props;
  const paths = [...defaultPaths, ...cookies.get('username') ? userPath : anonPath];
  return (
    <>
      <Navbar paths={paths.map(({ name, path }) => [name, path])} />
      <Switch>
        {[...defaultPaths, ...userPath, ...anonPath].map(({ path, component }) => <Route exact key={path} path={path} component={component} />)}
        <Route component={NotFound} />
      </Switch>
    </>
  );
};
