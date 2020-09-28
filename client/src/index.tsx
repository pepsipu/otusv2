import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import About from './components/About';

const router = (
  // @ts-ignore
  <Router>
    <Route path="/" component={About} />
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));
