import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import * as firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Configure firebase
const config = {
  apiKey: "AIzaSyBjC4MMGZ1TeXso6WuLgj5I3VqeIxq61Dg",
  authDomain: "encounter-49be9.firebaseapp.com",
  databaseURL: "https://encounter-49be9.firebaseio.com",
  projectId: "encounter-49be9",
  storageBucket: "encounter-49be9.appspot.com",
  messagingSenderId: "52182315576"
};
firebase.initializeApp(config);

//Render App
ReactDOM.render((
  <App />
), document.getElementById('root'));
    
registerServiceWorker();
