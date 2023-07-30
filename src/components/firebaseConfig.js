import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAShI3hQoUjorYwYbH2cRKIizVKPi7mFqU",
  authDomain: "eshop-7b064.firebaseapp.com",
  projectId: "eshop-7b064",
  storageBucket: "eshop-7b064.appspot.com",
  messagingSenderId: "137461741418",
  appId: "1:137461741418:web:acfebd18b4d0c1f50dd713",
  measurementId: "G-WR05KRLLWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default app;
export {auth};