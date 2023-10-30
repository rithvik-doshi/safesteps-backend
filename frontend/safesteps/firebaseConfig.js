import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCD8yq5aqe6cV_6OS2Z095n1H5gChR-uQU",
    authDomain: "safesteps-6a1bb.firebaseapp.com",
    projectId: "safesteps-6a1bb",
    storageBucket: "safesteps-6a1bb.appspot.com",
    messagingSenderId: "605033499652",
    appId: "1:605033499652:web:cb2ff98f6070d3bcb2b951",
    measurementId: "G-9K9G3TZHZZ"
};

export const FIREBASE_APP = initializeApp(firebaseConfig, );
export const FIREBASE_DB  = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export default firebaseConfig;