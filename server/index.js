// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env= require('dotenv')

const app = express();
const PORT = process.env.PORT || 8000;
env.config();

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "*",
}));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const rentalRoutes = require('./routes/rentals');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to DB`))
  .catch(err => console.error(err));