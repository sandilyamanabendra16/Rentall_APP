// src/components/CreateItem.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { useNavigate } from 'react-router-dom';
import styles from "./CreateItem.module.css";

const CreateItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[price,setPrice]=useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.items);
  const auth=useSelector((state)=>state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
        userId:auth.userId,
      title,
      description,
      price,
    };
    dispatch(addItem(itemData));
    navigate('/');
  };

  return (
    <div className={styles.main}>
      <h1>Create New Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {/* <input
          type="text"
          placeholder="Images (comma-separated URLs)"
          value={images.join(',')}
          onChange={(e) => setImages(e.target.value.split(','))}
        /> */}
        <input type="number"
        placeholder='Rental Price / day'
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        />
        <button type="submit">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
