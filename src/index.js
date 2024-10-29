import React, { StrictMode } from 'react';
import { HashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>  
    </StrictMode>
  </Provider>
);