// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhzkqzlYn3aNE9G0SszZec28DzebV25ls",
  authDomain: "book-review-app-6490d.firebaseapp.com",
  projectId: "book-review-app-6490d",
  storageBucket: "book-review-app-6490d.appspot.com",
  messagingSenderId: "916660454534",
  appId: "1:916660454534:web:3953afad7cf23fe934bd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;