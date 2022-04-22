import './App.css';
import { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import firebaseAuth from './firebase/config'
import Login from './components/Login';
import Hero from './components/Hero';

function App() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("")

  }

  const handleLogin = () => {
   
    clearErrors();
    
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

  });

  }

  const handleSignup = () => {
    clearErrors();
    createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // console.log(userCredential)
      // setIsLoggedIn(true)
  })
  .catch((error) => {
      // setIsLoggedIn(false)
      switch(error.code){
        case "firebaseAuth/email-already-in-use":
        case "firebaseAuth/invalid-email":
        
          setEmailError(error.message);
          break;
        case "firebaseAuth/weak-password":
          setPasswordError(error.message)
          break;
                      
      }
    
   });
  }

  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      // Sign-out successful.
      // setIsLoggedIn(false);
        setEmail("");
        setPassword("");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  const authListener = () => {
    
    onAuthStateChanged(firebaseAuth, (user)=>{
      if(user){
        clearInputs();
        setUser(user);
      }else{
        setUser("");
      }
    })
}

useEffect(() => {
    authListener();
}, []);

  return (
    <div className="App">

        { user ? (
                <Hero handleLogout={handleLogout} /> 

            ) : (
        <Login email = {email}
               setEmail = {setEmail}
                password = {password}
               setPassword = {setPassword}
               handleLogin={handleLogin}
               handleSignup={handleSignup}
               hasAccount={hasAccount}
               setHasAccount={setHasAccount}
               emailError={emailError}
               passwordError={passwordError}
               />

   )} 
    </div>
  );
}

export default App;
