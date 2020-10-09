import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './ui/Navbar';
import './Home.css';
import 'bootstrap-4-grid';
import Welcome from './Welcome';
import Settings from './Settings';

export default () => (
  <>
    <Navbar />
    <Router>
      <Route exact path="/home" component={Welcome} />
      <Route exact path="/home/settings" component={Settings} />
    </Router>
  </>
);
