import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './ui/Navbar';
import './App.css';
import 'bootstrap-4-grid';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';

export default () => (
  <>
    <Navbar />
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </>
);
