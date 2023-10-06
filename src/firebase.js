import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp);
export const db = getFirestore (firebaseApp);



