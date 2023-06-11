import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyCOzXpbyUlmLhtDTazMZ_jQtP52DuBNlVs',
  authDomain: 'libras-project-786d5.firebaseapp.com',
  projectId: 'libras-project-786d5',
  storageBucket: 'libras-project-786d5.appspot.com',
  messagingSenderId: '255427123080',
  appId: '1:255427123080:web:7c9c6d7e13f02cd8390c3d'
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

