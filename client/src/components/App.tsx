import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './ui/Navbar';
import './App.css';
import 'bootstrap-4-grid';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';

const paths = [
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  },
];

export default () => (
  <>
    <Navbar paths={paths.map(({ name, path }) => [name, path])} />
    <Switch>
      {paths.map(({ path, component }) => <Route exact path={path} component={component} />)}
      <Route component={NotFound} />
    </Switch>
  </>
);
