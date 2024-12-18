const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyDwuocjoPfy82Aaa6gkp1bOvolslqxtzjk",
  authDomain: "aspire-volonte-514ce.firebaseapp.com",
  projectId: "aspire-volonte-514ce",
  storageBucket: "aspire-volonte-514ce.firebasestorage.app",
  messagingSenderId: "370969632284",
  appId: "1:370969632284:web:111c8223948891c87289d9",
  measurementId: "G-TK60HNEMCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

module.exports = {
  app,
  db,
  storage,
  auth
}; 