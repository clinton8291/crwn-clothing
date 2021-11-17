import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; //For using db
import "firebase/compat/auth"; //For using authentication

const firebaseConfig = {
  //Firebasee configuration object
  apiKey: "AIzaSyDnx_ydA8Q9Tyqk-3xc3sTrCKQs9DLjuAo",
  authDomain: "crwn-db-c2c33.firebaseapp.com",
  projectId: "crwn-db-c2c33",
  storageBucket: "crwn-db-c2c33.appspot.com",
  messagingSenderId: "468622311084",
  appId: "1:468622311084:web:71b545abf2c08375606909",
  measurementId: "G-GRGSZLJESJ",
};

firebase.initializeApp(firebaseConfig);

//Storing user into Firestore DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user:",err.message );
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Configuring Google Signin popup
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
