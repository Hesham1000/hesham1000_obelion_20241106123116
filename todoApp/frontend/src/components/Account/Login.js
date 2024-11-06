import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://todoapp-backend.cloud-stacks.com/api/auth/${isRegistered ? 'login' : 'register'}`,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (isRegistered) {
        setMessage('Login successful');
        // Redirect to dashboard or desired page
        window.location.href = '/dashboard';
      } else {
        setMessage('Registration successful! Please check your email to confirm your account.');
        setIsRegistered(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div className="login-container">
      <h2>{isRegistered ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">{isRegistered ? 'Login' : 'Register'}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={toggleForm}>
        {isRegistered ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  );
}

export default Login;
