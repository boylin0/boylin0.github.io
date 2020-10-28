import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LiveABC from './route/liveABC/liveABC';
import Navbar from './component/navbar/navbar';
import reportWebVitals from './reportWebVitals';


import "jquery";
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import fontawesome from '@fortawesome/fontawesome-free/js/all.min.js';
//import 'animate.css/animate.css'

import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

import Home from './route/home/home';

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />

      <Switch>
        <Route path="/liveABC">
          <LiveABC />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      
    </HashRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
