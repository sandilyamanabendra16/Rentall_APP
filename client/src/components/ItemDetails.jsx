
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../actions/itemActions';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItems } from '../actions/itemActions';
import axios from "axios";
import { requestRent } from '../actions/itemActions';
import { deleteItem } from '../actions/itemActions';
import styles from "./ItemDetails.module.css";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {item, loading} = useSelector((state) => state.items);
  const auth=useSelector((state)=>state.auth);
  const[edit,setEdit]=useState(false);
  const[rented,setRented]=useState(false);
  const navigate= useNavigate();
  const {rentalRequest}=useSelector((state) => state.items);

  console.log(item);
  useEffect(() => {
    dispatch(fetchItemById(id));
    
  }, []);
  console.log(auth.userId);
  console.log(item.userId);

  useEffect(()=>{
    if(item.status==='rented'){
        setRented(true);
    }else{
        setRented(false)
    }
  },[item, item.status])

  useEffect(() => {
    if(item.userId === auth.userId){
        setEdit(true);
    }else{
        setEdit(false);
    }
  }, [auth?.isAuthenticated, item]);


//   if (loading || !item) {
//     return <div>Loading...</div>;
//   }
    const handleRentRequest=()=>{
        if(!auth.userId){
            return alert('Log In to rent')
        }else{
            dispatch(requestRent(id, auth.userId));
        }
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          dispatch(deleteItem(id));
          navigate('/'); // Redirect to home page or items list after deletion
        }
      };
  return (
    <div className={styles.main}>
<div className={styles.template}>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <div>
        {item.images.map((image, index) => (
          <img key={index} src={image} alt={item.title} />
        ))}
      </div>
      <div className={styles.button1}>
      <p>Price : {item.price}/day</p>
      {edit && <div className={styles.button2}>
        <button onClick={()=>navigate(`/items/${id}/edit`)}>Edit</button>
        <button onClick={handleDelete}> Delete</button>
      </div> }
      {!edit && <button onClick={handleRentRequest}>{rented ? 'Rented' : 'Request to rent'}</button>}
      </div>
      
    </div>
    </div>
    
  );
};

export default ItemDetails;
