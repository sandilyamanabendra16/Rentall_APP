
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById, updateItem } from '../actions/itemActions';
import { useParams,  useNavigate } from 'react-router-dom';
import styles from "./Update.module.css"

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { item, loading} = useSelector((state) => state.items);
  const item1 = useSelector((state) => state.items);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const[price,setPrice]=useState('');

  console.log(item1);
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setImages(item.images);
      setPrice(item.price);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      title,
      description,
      images,
      price,
    };
    dispatch(updateItem(id, updatedItem));
    navigate('/');
  };

  return (
    <div className={styles.main}>
      <h1>Update Item</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
          <input
            type="text"
            placeholder="Images (comma-separated URLs)"
            value={images.join(',')}
            onChange={(e) => setImages(e.target.value.split(','))}
          />
          <input type="number"
        placeholder='Rental Price / day'
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Item'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateItem;
