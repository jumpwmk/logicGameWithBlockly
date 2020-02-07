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

export const createUserProfileDocument = async (userAuth, additionData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  // console.log(snapShot);

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
