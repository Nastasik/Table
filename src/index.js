import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './components/Loader/Loader.css'
import ServerProvider from './components/ServerProvider';

ReactDOM.render(
  <ServerProvider>
    <App/>
  </ServerProvider>,
  document.getElementById('root')
);
