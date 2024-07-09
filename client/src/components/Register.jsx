// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';
import styles from "./Register.module.css";
import bgImg from "../assets/image 466.png"

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
      });
  const dispatch = useDispatch();
  const { name, email, password} = userData;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  const onChange = e => setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    <div className={styles.full}>
        <div className={styles.left}> 
        <h1> Create an account</h1>
        <p>Your personal rental finder is here</p>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        name="name"
        onChange={onChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name='password'
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      <p> Already have an account? <a href="/login">Sign in</a></p>
    </form>
    </div>
    <div className={styles.right}>
            <h1>Your Rental Finder</h1>
            <img src={bgImg} alt="bgImg"/>
    </div>
    </div>
  );
};

export default Register;
