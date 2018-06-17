import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducers/todo'

/*TODO:
1) Que funcione para meter nuevos datos, tal vez tenemos que hacerlo con Firebase para que funcione. Eso he visto, axios y firebase pueden tener interferencias. No es seguro, probémoslo, en el caso de que ni así funcione, utilicemos axios para pedir los datos sin firebase.
Lo importante es tener algo que funcione. Luego arreglamos los errores.
Después de agregar, eliminar y editar items, imprimir los 3 reportes
Pedir nueva paga
Por último, la parte de obligaciones
Pedir prórroga
Listo*/ 

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
