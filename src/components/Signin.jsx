import React, { useState } from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import app from './firebaseConfig';
import {auth} from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can perform the sign-in logic using the 'email' and 'password' values
    // For demonstration purposes, we will just print the input values
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset the form after submission (optional)
    setEmail('');
    setPassword('');
  };
  function handelSignin(e){
     e.preventDefault();
     signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('userName',email.substring(0,email.indexOf('@')));
    navigate("/");
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error);
  });
  }
  function handelSignup(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(email+" "+password+" "+errorMessage);
  });
  }


  return (
    <div className="signinWrapperMain">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn primaryBtn submit" onClick={handelSignin}>Sign In</button>
      </form>
      <p className='margin'></p>
      <h2>Don't have an account?</h2>
      <button type="submit" className="btn primaryBtn submit" onClick={handelSignup}>Sign Up</button>
    </div>
  );
};

export default SignInComponent;
