// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXgvNfeMKR7GR0zxUZGrV4mqO57UJxeu0",
  authDomain: "scai-db444.firebaseapp.com",
  projectId: "scai-db444",
  storageBucket: "scai-db444.appspot.com",
  messagingSenderId: "640809272472",
  appId: "1:640809272472:web:11aedf89f582ab58677ced",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
