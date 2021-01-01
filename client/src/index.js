import React from 'react';
import ReactDOM from 'react-dom';
import { TokenProvider } from './context/TokenContextAPI';
import App from './App';
import './style/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
