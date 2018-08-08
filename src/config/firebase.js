import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyDemug8MlcGOyYFP1q7hrPI3S1N5z3lpmU",
  authDomain: "comunidad-palca.firebaseapp.com",
  databaseURL: "https://comunidad-palca.firebaseio.com",
  projectId: "comunidad-palca",
  storageBucket: "comunidad-palca.appspot.com",
  messagingSenderId: "429730676229"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
  