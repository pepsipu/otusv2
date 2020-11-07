import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import Landing from './components/Landing';
import App from './components/App';
import 'react-toastify/dist/ReactToastify.css';

const router = (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={App} />
    </Switch>
  </Router>
);

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;
toast.configure({
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

ReactDOM.render(router, document.getElementById('root'));
