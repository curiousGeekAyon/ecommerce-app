import React, { useState } from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the form after submission (optional)
    setEmail('');
    setPassword('');
  };
  function handelSignin(e){
     e.preventDefault();
     signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    localStorage.setItem('userName',email.substring(0,email.indexOf('@')));
    navigate("/");
  })
  .catch((error) => {
    alert(error);
  });
  }
  function handelSignup(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((user) => {
    alert("Signed up succsfully ... \nNow click sign in to login");
  })
  .catch((error) => {
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
