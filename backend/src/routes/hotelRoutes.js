const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

const fs = require('fs');

// Image upload setup da
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// UPLOAD API - image upload pannura route da
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file da' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// GET all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hotels ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hotels WHERE id=$1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, location, price, description, image_path, latitude, longitude } = req.body;
    const result = await pool.query(
      `INSERT INTO hotels (title, location, price, description, image_path, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [title, location, price, description, image_path, latitude || 10.4583, longitude || 77.52]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, location, price, description, image_path, latitude, longitude } = req.body;
    const result = await pool.query(
      `UPDATE hotels SET title=$1, location=$2, price=$3, description=$4, image_path=$5, latitude=$6, longitude=$7 WHERE id=$8 RETURNING *`,
      [title, location, price, description, image_path, latitude, longitude, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM hotels WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deleted da!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;