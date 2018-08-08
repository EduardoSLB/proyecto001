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
    apiKey: "AIzaSyDemug8MlcGOyYFP1q7hrPI3S1N5z3lpmU",
    authDomain: "comunidad-palca.firebaseapp.com",
    databaseURL: "https://comunidad-palca.firebaseio.com",
    projectId: "comunidad-palca",
    storageBucket: "comunidad-palca.appspot.com",
    messagingSenderId: "429730676229"
};

firebase.initializeApp(config);

ReactDOM.render(<Provider store={store}> 
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
