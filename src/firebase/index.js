import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import CONFIG from './config';
import algoliasearch from 'algoliasearch';

const algoliaIndex = algoliasearch(
  CONFIG.ALGOLIA_CLIENT_ID,
  CONFIG.ALGOLIA_API_KEY
).initIndex(CONFIG.ALGOLIA_INDEX);

const firebaseConfig = {
  apiKey: CONFIG.FIREBASE_API_KEY,
  authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
  databaseURL: CONFIG.FIREBASE_DATABASE_URL,
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
};

export {
  auth,
  collections,
  firebase,
  algoliaIndex
};
