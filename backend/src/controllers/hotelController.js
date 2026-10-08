const db = require('../db');

exports.createHotel = async (req, res) => {
  try {
    const { title, description, price, latitude, longitude, location, rating } = req.body;
    const image = req.file? req.file.filename : null;

    console.log("FINAL BODY:", req.body, "IMAGE:", image);

    const result = await db.query(
      `INSERT INTO hotels (title, description, price, latitude, longitude, image, image_url, location, rating)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        title || "New Hotel",
        description || "Test",
        parseFloat(price) || 0,
        parseFloat(latitude) || 0,
        parseFloat(longitude) || 0,
        image,
        image,
        location || "Coimbatore",
        parseInt(rating) || 5
      ]
    );

    console.log("INSERTED:", result.rows[0]);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("CREATE FINAL ERROR:", err.message, err);
    res.status(500).json({ error: err.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hotels ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hotels WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Hotel not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { title, description, price, latitude, longitude } = req.body;
    const image = req.file? req.file.filename : null;

    let result;
    if (image) {
      result = await db.query(
        'UPDATE hotels SET title=$1, description=$2, price=$3, latitude=$4, longitude=$5, image=$6, image_url=$6 WHERE id=$7 RETURNING *',
        [title, description, price, latitude, longitude, image, req.params.id]
      );
    } else {
      result = await db.query(
        'UPDATE hotels SET title=$1, description=$2, price=$3, latitude=$4, longitude=$5 WHERE id=$6 RETURNING *',
        [title, description, price, latitude, longitude, req.params.id]
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await db.query('DELETE FROM hotels WHERE id = $1', [req.params.id]);
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};