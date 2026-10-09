
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const hotelRoutes = require('./src/routes/hotelRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded hotel images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/hotels', hotelRoutes);

// Serve React frontend conditionally
const frontendPath = path.join(__dirname, '../frontend/dist');
const fs = require('fs');

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // Handle React frontend routes
  app.use((req, res, next) => {
    if (
      req.method !== 'GET' ||
      req.path.startsWith('/api') ||
      req.path.startsWith('/uploads')
    ) {
      return next();
    }

    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  
  app.get('/', (req, res) => {
    res.send('Backend API is running. Please use the frontend URL to access the application.');
  });
}


const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});