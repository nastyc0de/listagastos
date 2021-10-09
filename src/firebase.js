import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

  apiKey:process.env.REACT_APP_APIKEY,

  authDomain:process.env.REACT_APP_AUTHDOMAIN ,

  projectId:process.env.REACT_APP_PROJECTID ,

  storageBucket:process.env.REACT_APP_STORAGEBUCKET ,

  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,

  appId:process.env.REACT_APP_APPID 

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authFirebase = getAuth(app)

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(authFirebase, email, password)
}

export const signInUser =(email, password) => {
  return signInWithEmailAndPassword(authFirebase, email, password)
}
