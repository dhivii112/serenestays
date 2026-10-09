const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://hotel_db_q1pd_user:Sga22MfcwP2Jo449azesEoJ6fvoFWVBd@dpg-db4798lg1s2s738gakf0-a.oregon-postgres.render.com/hotel_db_q1pd",
  ssl: { rejectUnauthorized: false }
});

const hotels = [
  { title: "The Taj Mahal Palace", location: "Mumbai", price: 15000, description: "Iconic sea-facing luxury hotel offering grand architecture and exceptional hospitality.", image_path: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", latitude: 18.9217, longitude: 72.8332 },
  { title: "The Oberoi Udaivilas", location: "Udaipur", price: 25000, description: "A spectacular palace hotel on the banks of Lake Pichola, known for royal treatments.", image_path: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", latitude: 24.5764, longitude: 73.6766 },
  { title: "Rambagh Palace", location: "Jaipur", price: 30000, description: "Former residence of the Maharaja, offering magnificent gardens and luxury suites.", image_path: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", latitude: 26.8961, longitude: 75.8056 },
  { title: "Taj Lake Palace", location: "Udaipur", price: 40000, description: "Floating like a jewel on Lake Pichola, offering unparalleled romance and luxury.", image_path: "https://images.unsplash.com/photo-1551882547-b79e5d5ea55b?w=800", latitude: 24.5750, longitude: 73.6800 },
  { title: "Umaid Bhawan Palace", location: "Jodhpur", price: 35000, description: "One of the world’s largest private residences, part of which is managed by Taj.", image_path: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", latitude: 26.2804, longitude: 73.0487 },
  { title: "Kumarakom Lake Resort", location: "Kerala", price: 18000, description: "A serene luxury retreat nestled along the tranquil backwaters of Kerala.", image_path: "https://images.unsplash.com/photo-1608198399988-341cb2c237d4?w=800", latitude: 9.6161, longitude: 76.4253 },
  { title: "The Leela Palace", location: "New Delhi", price: 16000, description: "A stunning modern palace offering world-class dining and lavish accommodations.", image_path: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800", latitude: 28.5794, longitude: 77.1891 },
  { title: "ITC Grand Chola", location: "Chennai", price: 14000, description: "A majestic luxury hotel inspired by the imperial Chola dynasty.", image_path: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=800", latitude: 13.0105, longitude: 80.2206 },
  { title: "Evolve Back", location: "Coorg", price: 22000, description: "Set amidst sprawling coffee plantations, perfect for a peaceful nature getaway.", image_path: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", latitude: 12.2882, longitude: 75.8752 },
  { title: "Wildflower Hall", location: "Shimla", price: 28000, description: "An Oberoi resort offering majestic views of the Himalayas and a luxury spa.", image_path: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800", latitude: 31.1048, longitude: 77.1734 },
  { title: "Taj Falaknuma Palace", location: "Hyderabad", price: 32000, description: "A jewel amongst the clouds, offering a glimpse into the lavish Nizam lifestyle.", image_path: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800", latitude: 17.3312, longitude: 78.4674 },
  { title: "The Serai", location: "Jaisalmer", price: 20000, description: "Luxury desert camp and spa offering a magnificent glamping experience.", image_path: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=800", latitude: 26.9157, longitude: 70.9083 }
];

async function seed() {
 
  await pool.query("DELETE FROM hotels");
  for (let h of hotels) {
    await pool.query(
      "INSERT INTO hotels (title, location, price, description, image_path, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [h.title, h.location, h.price, h.description, h.image_path, h.latitude, h.longitude]
    );
  }
  console.log("Inserted 12 hotels!");
  pool.end();
}
seed().catch(console.error);
