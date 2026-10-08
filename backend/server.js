const express = require('express');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const hotelRoutes = require('./src/routes/hotelRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/hotels', hotelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
