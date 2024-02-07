import React, { useState } from 'react';
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import LoginPage from "./components/Login"; // import your login page component

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this line

  const handleLogin = () => {
    setIsLoggedIn(true);
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
        ) : (
          <LoginPage onLogin={handleLogin} /> // Pass the handleLogin function to LoginPage
        )}
      </div>
    </main>
  );
};

export default App;
