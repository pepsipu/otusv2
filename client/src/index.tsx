import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing';
import Home from './components/Home';

const router = (
  // @ts-ignore
  <Router>
    <Route exact path="/" component={Landing} />
    <Route path="/home" component={Home} />
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));
