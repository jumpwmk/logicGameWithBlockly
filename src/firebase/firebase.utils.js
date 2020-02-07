import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCCPHqUlwjxDsRkX1N0EwjpKX1-aBTjxVQ',
  authDomain: 'logicgame-9f4ca.firebaseapp.com',
  databaseURL: 'https://logicgame-9f4ca.firebaseio.com',
  projectId: 'logicgame-9f4ca',
  storageBucket: 'logicgame-9f4ca.appspot.com',
  messagingSenderId: '376123077580',
  appId: '1:376123077580:web:186f053a005299ca2a6369',
  measurementId: 'G-PNKR9WJX2T'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
