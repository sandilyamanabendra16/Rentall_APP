
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ItemCard.module.css"

const ItemCard = ({ item }) => {
    const navigate=useNavigate();
    
    const viewDetails=(id)=>{
        navigate(`/items/${id}`)
    }
  return (
    <div className={styles.template}>
        <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        </div>
      
      <div className={styles.price}>
      <p>Price: ${item.price}/day</p>
      <button onClick={()=>viewDetails(item._id)}>View Details</button>
      </div>
    </div>
  );
};

export default ItemCard;
