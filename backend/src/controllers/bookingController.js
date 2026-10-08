const db = require('../db');

exports.createBooking = async (req, res) => {
  const { hotel_id, customer_name, phone, check_in, check_out, guests } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO bookings (hotel_id, customer_name, phone, check_in, check_out, guests) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [hotel_id, customer_name, phone, check_in, check_out, guests]
    );
    res.status(201).json({ message: 'Booked!', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const result = await db.query('SELECT b.*, h.title FROM bookings b JOIN hotels h ON b.hotel_id = h.id ORDER BY b.booking_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};