import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducers/todo'

/*TODO:
- Hacer documento de carné
- Hacer documento de obligaciones
- Hacer documento de constancia de obligaciones
*/ 

const store = createStore(reducer);

var config = {
    apiKey: "AIzaSyCTi8MO-Fh2rOuDjsDOnpvUQpnVKh-vy_0",
    authDomain: "proyecto-tarma.firebaseapp.com",
    databaseURL: "https://proyecto-tarma.firebaseio.com",
    projectId: "proyecto-tarma",
    storageBucket: "proyecto-tarma.appspot.com",
    messagingSenderId: "792810804917"
};

firebase.initializeApp(config);

ReactDOM.render(<Provider store={store}> 
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
