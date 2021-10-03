
//to use firebase app
import firebase from 'firebase/compat/app'; //v9

//to use auth
import 'firebase/compat/auth'; //v9

//to use firestore
import 'firebase/compat/firestore'; //v9

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebaseConfig from "../../firebase.config";

const provider = new GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export const googleSignIn = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
      const { displayName, email, photoURL, uid } = result.user;
      const newUser = { name: displayName, email, photoURL, user_id: uid };
      return newUser;
    })
    .catch((error) => {
      return error;
    });
};

export const registerWithEmail = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { displayName, email, photoURL, uid } = userCredential.user;
      const newUser = { name: displayName, email, photoURL, user_id: uid };
      return newUser;
    })
    .catch((error) => {
      return error.message;
    });
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const { displayName, email, photoURL, uid } = userCredential.user;
      const newUser = { name: displayName, email, photoURL, user_id: uid };
      return newUser;
      // ...
    })
    .catch((error) => {
      return error.message;
    });
};

export const signedOut = () => {
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      return error;
    });
};


export const idToken = () =>{
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(token) {
        localStorage.setItem('token', token)
        return token
      }).catch(function(error) {
        // Handle error
      });
}

