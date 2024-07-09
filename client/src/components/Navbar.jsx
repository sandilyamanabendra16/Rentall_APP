// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.auth);
  const [token1, setToken1]=useState(false);
  const [admin, setAdmin]=useState(false)
const isAuthenticated= authstate.isAuthenticated;
const role=authstate.role;
  const handleLogout = () => {
    dispatch(logout());
    setToken1(false);
  };
useEffect(()=>{
  if(role==='admin'){
    setAdmin(true)
  }else{
    setAdmin(false);
  }

},[isAuthenticated])
  console.log(role);
  return (
    <div className={styles.main}>
      <h1>Rental App</h1>
      <ul>

        {isAuthenticated ? (
          <>
            <li><Link to="/profile" className={styles.link}>Profile</Link></li>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            {admin &&
              <li><Link to="/admin" className={styles.link}>Admin</Link></li>            
            }
            <li><Link to="/create" className={styles.link}> Post Item</Link></li>
            <li><Link to="/rented-items" className={styles.link}>Rented Items</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={styles.link}>Login</Link></li>
            <li><Link to="/register" className={styles.link}>Register</Link></li>
          </>
        )}
      </ul>
      {isAuthenticated ? <button onClick={handleLogout} className={styles.link}>Logout</button>: null}
    </div>
  );
};

export default Navbar;
