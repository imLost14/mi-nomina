
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxQ9Iint-WlxZMfqUf2ziKx9x3mCbz8Ps",
  authDomain: "fb-crud-react-7c1eb.firebaseapp.com",
  projectId: "fb-crud-react-7c1eb",
  storageBucket: "fb-crud-react-7c1eb.firebasestorage.app",
  messagingSenderId: "386306609109",
  appId: "1:386306609109:web:c7c3822709bafd370df75c"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app) //La variable de conexión