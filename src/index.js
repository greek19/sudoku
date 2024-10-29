import React, { StrictMode } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>  
  </StrictMode>,
  document.getElementById('root'),
)