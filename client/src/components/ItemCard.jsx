
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ItemCard.module.css"
import { deleteItem, requestRent } from '../actions/itemActions';
import { useDispatch, useSelector } from 'react-redux';

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
//   const {item, loading} = useSelector((state) => state.items);
  const auth=useSelector((state)=>state.auth);
  const[edit,setEdit]=useState(false);
  const[rented,setRented]=useState(false);
  const {rentalRequest}=useSelector((state) => state.items);
  const [rentRequested, setRentRequested] = useState(false);
    const navigate=useNavigate();
    
    const viewDetails=(id)=>{
        navigate(`/items/${id}`)
    }
    // useEffect(() => {
    //     dispatch(fetchItemById(id));
    //   }, []);
      
    
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
    const handleRentRequest = async (id) => {
        if (!auth.userId) {
          alert('Log In to rent');
          return;
        }
        
        try {
          const result = await dispatch(requestRent(id, auth.userId)).unwrap();
          console.log(result);
          if (result.success) {
            alert('Rent request sent successfully!');
            setRentRequested(true);
            // Note: We're not setting rented to true here
          } else {
            console.log(result.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          dispatch(deleteItem(id))
            .then(() => {
              alert('Item deleted successfully');
              navigate('/');
            })
            .catch((error) => {
              console.error('Error deleting item:', error);
              alert('Failed to delete item. Please try again.');
            });
        }
      };
    
  return (
    <div className={styles.template}>
        <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        </div>
      
      <div className={styles.price}>
      <p>Price: ${item.price}/day</p>
      <div>
      {/* <button onClick={()=>viewDetails(item._id)}>View Details</button> */}
      {edit && <div className={styles.button2}>
        <button onClick={()=>navigate(`/items/${item._id}/edit`)}>Edit</button>
        <button onClick={()=>handleDelete(item._id)}> Delete</button>
      </div> }
      {!edit && (
            <button className={styles.button1}
                onClick={() => handleRentRequest(item._id)}
                disabled={rented || rentRequested}
                    >
                {rented ? 'Rented' : (rentRequested ? 'Request Sent' : 'Request to rent')}
            </button>
        )}
      </div>
      
      </div>
    </div>
  );
};

export default ItemCard;
