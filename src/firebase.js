import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAo_89q5H-ff1Vt5XSeYQqE5cUzsHuIeUw",
    authDomain: "mcfc-6b482.firebaseapp.com",
    databaseURL: "https://mcfc-6b482.firebaseio.com",
    projectId: "mcfc-6b482",
    storageBucket: "mcfc-6b482.appspot.com",
    messagingSenderId: "1017664093720",
    appId: "1:1017664093720:web:a9d2a9ad33159450740d6d",
    measurementId: "G-53P1W9XJEH"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');

export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams
};