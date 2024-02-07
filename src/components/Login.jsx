import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        userName: username,
        password: password,
      });

      // Check if the response contains a token
      if (response.data && typeof response.data === 'string' && response.data !== 'user does not exist') {
        localStorage.setItem('token', response.data.token);
        onLogin();
      } else {
        // Handle login failure
        alert('Login failed. Please enter valid details.');
      }
    } catch (error) {
      // Handle request error
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Log in</button>
      
    </form>
  );
};

export default LoginPage;
