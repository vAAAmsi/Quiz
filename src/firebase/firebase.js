import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmlr36nX0E8lGpDd4bRMWt9tga8Q9GxMQ",
  authDomain: "auth-a2802.firebaseapp.com",
  projectId: "auth-a2802",
  storageBucket: "auth-a2802.appspot.com",
  messagingSenderId: "836484922897",
  appId: "1:836484922897:web:d01ef62f13d38b9fed3bb0",
  measurementId: "G-NS8B0Y3ECM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth};
export default db;
