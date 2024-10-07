// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEvAWJ_fGq9ZUaJoLm1N1_RCCzlgVBLb4",
  authDomain: "amaf-dea2e.firebaseapp.com",
  projectId: "amaf-dea2e",
  storageBucket: "amaf-dea2e.appspot.com",
  messagingSenderId: "615115468928",
  appId: "1:615115468928:web:e19a81e0948426f1baf665",
  measurementId: "G-T3M5RB52H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);