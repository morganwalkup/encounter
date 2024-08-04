import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Render App
ReactDOM.render((
  <App />
), document.getElementById('root'));
    
registerServiceWorker();
