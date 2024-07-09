import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../actions/itemActions';
import ItemCard from './ItemCard';
import axios from "axios";
import Navbar from './Navbar.jsx';
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const {items,loading} = useSelector((state) => state.items);
// const [item,setItem]=useState(nuls)
  useEffect(() => {
      dispatch(fetchItems());
  }, []);
  console.log(items);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
        <Navbar/>
      <h1>Available Items</h1>
      <div className={styles.itemlist}>
        {items?.map((item) => (
          <ItemCard key={item._id} item={item} className={styles.template} />
        ))}
      </div>
    </div>
  );
};

export default Home;
