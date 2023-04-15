import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAxY2rXeHHS3te86ch-kEdbwxLliPVwTGE",
  authDomain: "sauntertesttask.firebaseapp.com",
  projectId: "sauntertesttask",
  storageBucket: "sauntertesttask.appspot.com",
  messagingSenderId: "529422127668",
  appId: "1:529422127668:web:45fdf4502a798a9a2eb061"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)