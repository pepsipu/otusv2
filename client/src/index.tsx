import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import Landing from './components/Landing';
import App from './components/App';

const router = (
  <CookiesProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={App} />
      </Switch>
    </Router>
  </CookiesProvider>
);

ReactDOM.render(router, document.getElementById('root'));
