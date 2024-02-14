import React, { useState } from 'react';
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSigningUp(false);
  };

  const handleSignup = () => {
    setIsSigningUp(true);
  };

  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        {isLoggedIn ? (
          <>
            <Hero />
            <Demo />
          </>
        ) : isSigningUp ? (
          <SignupPage onSignup={handleLogin} />
        ) : (
          <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </div>
    </main>
  );
};

export default App;
