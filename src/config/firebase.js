import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyCTi8MO-Fh2rOuDjsDOnpvUQpnVKh-vy_0",
    authDomain: "proyecto-tarma.firebaseapp.com",
    databaseURL: "https://proyecto-tarma.firebaseio.com",
    projectId: "proyecto-tarma",
    storageBucket: "proyecto-tarma.appspot.com",
    messagingSenderId: "792810804917"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
  