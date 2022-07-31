// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAex3BXdbrrMo-l6gZRd7zz0WHLhhjX8vs',
  authDomain: 'doittoday-e3608.firebaseapp.com',
  databaseURL: 'https://doittoday-e3608-default-rtdb.firebaseio.com',
  projectId: 'doittoday-e3608',
  storageBucket: 'doittoday-e3608.appspot.com',
  messagingSenderId: '812268740507',
  appId: '1:812268740507:web:fc493a37244f5a86ee8b3e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
