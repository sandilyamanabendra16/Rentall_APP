// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ItemDetails from './components/ItemDetails';
import Admin from './components/Admin';
import CreateItem from './components/CreateItem.jsx';
import UpdateItem from './components/UpdateItem.jsx';
import RentedItems from './components/RentedItem.jsx';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreateItem/>} />
        <Route path="/items/:id/edit" element={<UpdateItem/>} />
        <Route path="/items/:id" element={<ItemDetails/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/rented-items" element={<RentedItems/>} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
