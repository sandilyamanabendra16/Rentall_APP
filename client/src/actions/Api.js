// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    const profile1String = localStorage.getItem('token');
    const profile1Object = JSON.parse(profile1String);
    const { token } = profile1Object;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
