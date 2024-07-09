
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./ItemCard.module.css"

const ItemCard = ({ item }) => {
    const handleRentRequest=()=>{

    }
  return (
    <div className={styles.template}>
        <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        </div>
      
      <div className={styles.price}>
      <p>Price: ${item.price}/day</p>
      <Link to={`/items/${item._id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default ItemCard;
