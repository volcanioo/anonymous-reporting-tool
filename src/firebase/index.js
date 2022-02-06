import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import algoliasearch from 'algoliasearch';

const algoliaIndex = algoliasearch(
  process.env.VUE_APP_ALGOLIA_CLIENT_ID,
  process.env.VUE_APP_ALGOLIA_API_KEY
).initIndex(process.env.VUE_APP_ALGOLIA_INDEX);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MS_ID,
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
