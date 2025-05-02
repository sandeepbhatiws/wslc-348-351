// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0G6VQBeQC_tkhqHIM6-KEqFmBuGsbf4g",
  authDomain: "quiz-application-f30a1.firebaseapp.com",
  projectId: "quiz-application-f30a1",
  storageBucket: "quiz-application-f30a1.firebasestorage.app",
  messagingSenderId: "528565237912",
  appId: "1:528565237912:web:c6a61f384d340d64e638ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;