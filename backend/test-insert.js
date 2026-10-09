const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://hotel_db_q1pd_user:Sga22MfcwP2Jo449azesEoJ6fvoFWVBd@dpg-db4798lg1s2s738gakf0-a.oregon-postgres.render.com/hotel_db_q1pd",
  ssl: { rejectUnauthorized: false }
});

const payload = { title: "Test", location: "Chennai", price: 2300, description: "comfort", image_path: "/uploads/abc.jpg", latitude: 76, longitude: 34 };

pool.query(
      "INSERT INTO hotels (title, location, price, description, image_path, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [payload.title, payload.location, payload.price, payload.description, payload.image_path, payload.latitude, payload.longitude]
    )
  .then(res => { console.log("Insert success", res.rows[0]); pool.end(); })
  .catch(err => { console.error("Insert error:", err.message); pool.end(); });
