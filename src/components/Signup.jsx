import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = ({ onSignup }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        password: password,
      });

      if (response.data === 'done') {
        onSignup();
      } else {
        // Handle signup failure
        alert('Signup failed. Please enter valid details.');
      }
    } catch (error) {
      // Handle request error
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupPage;
