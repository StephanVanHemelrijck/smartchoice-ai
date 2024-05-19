// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSIXKT76WcpZfFlW8lUDzkjU9498usWxY",
  authDomain: "smartchoice-ai.firebaseapp.com",
  projectId: "smartchoice-ai",
  storageBucket: "smartchoice-ai.appspot.com",
  messagingSenderId: "337011921343",
  appId: "1:337011921343:web:59e8bb4f523b0a27f4110a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
