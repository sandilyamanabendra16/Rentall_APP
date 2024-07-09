// src/reducers/itemReducer.js
const initialState = {
    items: [],
    item:null,
    loading: true,
    error: null,
    rentalRequest: null,
    rentedItems: [],
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'FETCH_ITEMS_SUCCESS':
        return {
          ...state,
          items: payload,
          loading: false,
        };
      case 'FETCH_ITEMS_FAIL':
        return {
          ...state,
          error: payload,
          loading: false,
        };
    case 'FETCH_SUCCESS':
        return{
            ...state,
          item: payload,
          loading: false,
        }
    case 'FETCH_FAIL':
        return{
            ...state,
            error: payload,
            loading: false,
        }
        case 'FETCH_PENDING_ITEMS_SUCCESS':
          return {
            ...state,
            items: payload,
            loading: false,
          };
        case 'FETCH_PENDING_ITEMS_FAIL':
          return {
            ...state,
            error: payload,
            loading: false,
          };
        case 'APPROVE_ITEM_SUCCESS':
          return {
            ...state,
            items: state.items.filter(item => item._id !== payload._id),
            loading: false,
          };
        case 'APPROVE_ITEM_FAIL':
          return {
            ...state,
            error: payload,
            loading: false,
          };
      case 'ADD_ITEM_SUCCESS':
        return {
          ...state,
          items: [payload, ...state.items],
          loading: false,
        };
      case 'ADD_ITEM_FAIL':
        return {
          ...state,
          error: payload,
          loading: false,
        };
    case 'UPDATE_ITEM_SUCCESS':
        return {
              ...state,
              items: state.items.map((item) =>
                item._id === payload._id ? payload : item
              ),
              loading: false,
            };
    case 'UPDATE_ITEM_FAIL':
        return {
            ...state,
            error: payload,
            loading: false,
          };
    case 'RENT_REQUEST_SUCCESS':
        return {
            ...state,
            rentalRequest: payload,
            loading: false,
            };
    case 'RENT_REQUEST_FAIL':
        return {
            ...state, 
            error: payload,
            loading:false,
        }
    case 'FETCH_RENTED_ITEMS_SUCCESS': // Handle successful fetch of rented items
        return {
          ...state,
          rentedItems: payload,
          loading: false,
        };
    case 'UNRENT_ITEM_SUCCESS': // Handle unrent item success
        return {
          ...state,
          rentedItems: state.rentedItems.filter(item => item._id !== payload._id),
          loading: false,
        };
    case 'UNRENT_ITEM_FAIL':
      return{
        ...state, 
            error: payload,
            loading:false,
      }
    case 'DELETE_ITEM_REQUEST':
  return { ...state, loading: true };
    case 'DELETE_ITEM_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case 'DELETE_ITEM_FAILURE':
      return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  