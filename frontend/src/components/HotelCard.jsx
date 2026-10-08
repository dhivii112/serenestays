import { Link } from 'react-router-dom';
import axios from 'axios';

const FALLBACK = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
  'https://images.unsplash.com/photo-1551882547-b79e5d5ea55b?w=800',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
];

export default function HotelCard({ hotel, onDelete }) {
  const validImg = hotel.image_path && (hotel.image_path.startsWith('http') || hotel.image_path.includes('uploads'));
  const fallbackImg = FALLBACK[hotel.id % FALLBACK.length];
  const imageUrl = validImg ? hotel.image_path : fallbackImg;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm(`"${hotel.title}" delete pannava da?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${hotel.id}`);
      onDelete(hotel.id); // ITHU THAN MUKKIYAM DA - LIST LA IRUNTHU UDANE POYIDUM DA!
    } catch (err) {
      alert('Delete failed da: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border hover:shadow-xl transition group">
      <div className="relative h-[220px] bg-gray-100">
        <Link to={`/hotels/${hotel.id}`}>
          <img src={imageUrl} alt={hotel.title} className="w-full h-full object-cover" onError={(e)=>e.target.src=fallbackImg} />
        </Link>
        <div className="absolute top-3 right-3 flex gap-2">
          <Link to={`/edit/${hotel.id}`} className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold shadow">✏️ Edit</Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow hover:bg-red-600">🗑️ Delete</button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg truncate">{hotel.title}</h4>
        <p className="text-gray-500 text-sm truncate">{hotel.location}</p>
        <p className="font-black mt-2">₹{hotel.price} <span className="font-normal text-sm text-gray-400">/ night</span></p>
      </div>
    </div>
  );
}