import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firebase } from './firebase';

firebase.auth().onAuthStateChanged(authUser => {
    ReactDOM.render(<App user={authUser} />, document.getElementById('root'));
    serviceWorker.unregister();
})


