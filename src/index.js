import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router
} from "react-router-dom";

import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
  <Router>
<App/>
    </Router>,
  document.getElementById('root')
);
