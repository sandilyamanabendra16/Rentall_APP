// src/components/Admin.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingItems, approveItem } from '../actions/itemActions';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="item-list">
        {items.map((item) => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button onClick={() => handleApprove(item._id)}>Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
