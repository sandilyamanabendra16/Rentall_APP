// src/components/Admin.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingItems, approveItem } from '../actions/itemActions';
import styles from './Admin.module.css';

const Admin = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchPendingItems());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveItem(id));
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.header}>Admin Panel</h1>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item._id} className={styles.itemCard}>
            <h2 className={styles.itemTitle}>{item.title}</h2>
            <p className={styles.itemDescription}>{item.description}</p>
            <button 
              className={styles.approveButton}
              onClick={() => handleApprove(item._id)}
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;