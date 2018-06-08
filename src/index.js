import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCTi8MO-Fh2rOuDjsDOnpvUQpnVKh-vy_0",
    authDomain: "proyecto-tarma.firebaseapp.com",
    databaseURL: "https://proyecto-tarma.firebaseio.com",
    projectId: "proyecto-tarma",
    storageBucket: "proyecto-tarma.appspot.com",
    messagingSenderId: "792810804917"
};

firebase.initializeApp(config);

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
