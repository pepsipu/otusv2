import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing';
import App from './components/App';

const router = (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));
