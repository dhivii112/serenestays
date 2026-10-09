import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}/${id}`).then(res => {
      setHotel(res.data);
      document.title = `${res.data.title} | SereneStays`;
    });
  }, [id]);

  if (!hotel) return <p className="text-center mt-20">Loading da...</p>;

  const lat = hotel.latitude || 11.0168;
  const lng = hotel.longitude || 76.9558;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-sm font-bold mb-4 inline-block">← Back to Hotels</Link>

      <img
        src={hotel.image_path?.startsWith('http')? hotel.image_path : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${hotel.image_path}`}
        alt={hotel.title}
        className="w-full h-[400px] object-cover rounded-2xl"
        onError={e=>e.target.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
      />

      <h1 className="text-3xl font-black mt-6">{hotel.title}</h1>
      <p className="text-gray-500 mt-1">{hotel.location} • ₹{hotel.price} / night</p>
      <p className="mt-4 text-gray-700 leading-7">{hotel.description}</p>

      {/* MAP SECTION DA - ITHU THAN PUTHUSA ADD PANNATHU DA */}
      <div className="mt-8 bg-white border rounded-2xl p-4 shadow-sm">
        <h3 className="font-black text-lg mb-3">📍 Location Map</h3>
        <div className="rounded-xl overflow-hidden border">
          <iframe
            title="map"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.02}%2C${lat-0.02}%2C${lng+0.02}%2C${lat+0.02}&layer=mapnik&marker=${lat}%2C${lng}`}
          ></iframe>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-500 font-mono">Lat: {lat}, Lng: {lng}</p>
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}