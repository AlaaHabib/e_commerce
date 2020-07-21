import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    
        apiKey: "AIzaSyDkcc2rr33cjCIMQ0s1bXHbpnYSjlD1pnM",
        authDomain: "crwn-db-1c964.firebaseapp.com",
        databaseURL: "https://crwn-db-1c964.firebaseio.com",
        projectId: "crwn-db-1c964",
        storageBucket: "crwn-db-1c964.appspot.com",
        messagingSenderId: "644772918698",
        appId: "1:644772918698:web:b45c48b20b1d28ef6e27d3",
        measurementId: "G-HT54B2396D"
      }

export const createUserProfileDocument = async (userAuth , additionalData)=>{
   if ( ! userAuth) return ;
   const firestore = firebase.firestore();
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();

   if(!snapShot.exists){
     const {displayName , email} = userAuth;
     const createdAt = new Date();

     try {
       await userRef.set({
         displayName ,
         email,
         createdAt,
         ...additionalData
       })
     } catch (error) {
       console.log('error creating user',error.message)
     }
   }
   return userRef;

};


firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = ()=>{auth.signInWithPopup(provider)
};

export default firebase;