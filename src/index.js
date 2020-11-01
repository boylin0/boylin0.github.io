/* Requirement */
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

/* Global Library */
import "jquery";
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

/* Import */
import './utils'

/* Component */
import App from './component/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
