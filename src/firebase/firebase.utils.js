import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCPST7k-R5lVxg2uWIadXMB2gdk-S2OuAg",
    authDomain: "crwn-clothing-a3ccb.firebaseapp.com",
    projectId: "crwn-clothing-a3ccb",
    storageBucket: "crwn-clothing-a3ccb.appspot.com",
    messagingSenderId: "298329065678",
    appId: "1:298329065678:web:06312d583daecb8735689f",
    measurementId: "G-S4HVYNNSDQ"
  };

  if (!firebase.apps.length) {
    
  firebase.initializeApp(firebaseConfig);
  }
 

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const createProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} =userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData

        }
          )

      }catch(error){
          console.log("Error Creating User" , error.message);
      }
    }
    return userRef;
    
  };

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle =() => auth.signInWithPopup(provider);

  export default firebase;
