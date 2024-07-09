
import axios from 'axios';
import { baseUrl } from "./constant";

export const fetchItems = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/items`);
    dispatch({ type: 'FETCH_ITEMS_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_ITEMS_FAIL', payload: err.response.data });
  }
};

export const addItem = (itemData) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${baseUrl}/api/items`, itemData);
    dispatch({ type: 'ADD_ITEM_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'ADD_ITEM_FAIL', payload: err.response.data });
  }
};

export const fetchItemById=(id)=> async (dispatch)=>{
    try{
        const {data}= await axios.get(`${baseUrl}/api/items/${id}`);
        dispatch({type: "FETCH_SUCCESS", payload:data})

    }catch(err){
        dispatch({type:'FETCH_FAIL', payload:err.response.data})
    }
}

export const updateItem = (id, itemData) => async (dispatch) => {
    try {
      const {data} = await axios.put(`${baseUrl}/api/items/${id}`, itemData);
      dispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'UPDATE_ITEM_FAIL', payload: err.response ? err.response.data : 'Server Error' });
    }
  };

  export const requestRent = (itemId, renterId) => async (dispatch) => {
    try {
      const res = await axios.post(`${baseUrl}/api/items/rent`, { itemId, renterId });
      dispatch({ type: 'RENT_REQUEST_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'RENT_REQUEST_FAIL', payload: err.response ? err.response.data : 'Server Error' });
    }
  };

  export const fetchRentedItems = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`${baseUrl}/api/items/rented/${userId}`);
      dispatch({ type: 'FETCH_RENTED_ITEMS_SUCCESS', payload: res.data});
    } catch (err) {
      dispatch({ type: 'FETCH_RENTED_ITEMS_FAIL', payload: err.response ? err.response.data : 'Server Error' });
    }
  };

  export const unrentItem = (itemId, renterId) => async (dispatch) => {
    try {
      const res = await axios.post(`${baseUrl}/api/items/unrent`, { itemId, renterId });
      dispatch({ type: 'UNRENT_ITEM_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UNRENT_ITEM_FAIL', payload: err.response ? err.response.data : 'Server Error' });
    }
  };

  export const deleteItem = (itemId) => async (dispatch) => {
    dispatch({ type: 'DELETE_ITEM_REQUEST' });
    try {
      await axios.delete(`${baseUrl}/api/items/delete`);
      dispatch({ type: 'DELETE_ITEM_SUCCESS', payload: itemId });
    } catch (error) {
      dispatch({ type: 'DELETE_ITEM_FAILURE', payload: error.message });
    }
  };

  export const fetchPendingItems = () => async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await axios.get(`${baseUrl}/api/admin/items`);
      dispatch({ type: 'FETCH_PENDING_ITEMS_SUCCESS', payload: res.data });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (err) {
      dispatch({ type: 'FETCH_PENDING_ITEMS_FAIL', payload: err.response ? err.response.data : 'Server Error' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Approve an item
  export const approveItem = (id) => async (dispatch) => {
    try {
      const res = await axios.put(`${baseUrl}/api/items/${id}/approve`);
      dispatch({ type: 'APPROVE_ITEM_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'APPROVE_ITEM_FAIL', payload: err.response ? err.response.data : 'Server Error' });
    }
  };