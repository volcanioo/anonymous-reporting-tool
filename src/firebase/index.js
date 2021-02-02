import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import CONFIG from './config';

const firebaseConfig = {
  apiKey: CONFIG.FIREBASE_API_KEY,
  authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
  databaseURL: '',
  projectId: CONFIG.FIREBASE_PROJECT_ID,
  storageBucket: CONFIG.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: CONFIG.FIREBASE_SENDER_ID,
  appId: CONFIG.FIREBASE_APP_ID,
  measurementId: CONFIG.FIREBASE_MS_ID,
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

const collections = {
  cases: db.collection('cases'),
  users: db.collection('users'),
  companies: db.collection('companies'),
  unknown: db.collection('/cases/ybwpuhNeTsWHzTKqKIJy/unknown'),
};

export {
  auth,
  collections,
};
