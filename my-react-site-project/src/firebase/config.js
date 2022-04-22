import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZaMRmjVKfy9Xq31lmscWuHOx0N4cfaEU",
    authDomain: "react-project-8bfc4.firebaseapp.com",
    projectId: "react-project-8bfc4",
    storageBucket: "react-project-8bfc4.appspot.com",
    messagingSenderId: "1050430731658",
    appId: "1:1050430731658:web:83c9bbb888fb420fc64473"
  };
  // Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export default firebaseAuth;