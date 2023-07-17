import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/auth';
import * as db from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0xYzwqB-OVBG2AfMdkL3d1ToohB-mO6Q",
  authDomain: "appmaster-firebase.firebaseapp.com",
  projectId: "appmaster-firebase",
  storageBucket: "appmaster-firebase.appspot.com",
  messagingSenderId: "318263400793",
  appId: "1:318263400793:web:6589dc85f9dcddf0091448",
  measurementId: "G-KWSYRMB70F"
};

const app = initializeApp(firebaseConfig);
export const auth = firebase.getAuth(app)
export const googleProvider = new firebase.GoogleAuthProvider()
export const database = db.getFirestore(app)