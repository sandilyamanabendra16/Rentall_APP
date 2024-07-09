// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import bgImg from "../assets/image 466.png";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
    const navigate= useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate('/');
  };

  return (
    <div className={styles.full}>
        <div className={styles.left}>
        <h1> Already have an account? </h1>
        <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p> Don't have an account <a href="/register">Sign Up</a></p>
    </form>
        </div>
        <div className={styles.right}>
            <h1>Your Personal Rental App</h1>
            <img src={bgImg} alt="bgImg"/>
        </div>

    </div>
  );
};

export default Login;
