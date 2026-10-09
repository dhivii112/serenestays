import { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from '../components/HotelCard';

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}`).then(res => setHotels(res.data));
    document.title = "SereneStays - Luxury Stays";
  }, []);

  const filtered = hotels.filter(h => {
    const matchSearch = h.title?.toLowerCase().includes(search.toLowerCase()) || h.location?.toLowerCase().includes(search.toLowerCase());
    let matchPrice = true;
    if (priceFilter === 'low') matchPrice = h.price < 2000;
    if (priceFilter === 'mid') matchPrice = h.price >= 2000 && h.price <= 3000;
    if (priceFilter === 'high') matchPrice = h.price > 3000;
    return matchSearch && matchPrice;
  });

  const indexLast = currentPage * perPage;
  const currentHotels = filtered.slice(indexLast - perPage, indexLast);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleDelete = (id) => setHotels(prev => prev.filter(h => h.id!== id));

  return (
    <div className="px-6 py-6">
      <p className="text-center text-gray-400 text-sm mb-4">Discover luxury hotels, boutique stays, and resorts</p>

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-center">
        <div className="flex-1 w-full flex items-center border rounded-full px-6 py-3 shadow-sm bg-white">
          <div className="flex-1 text-left">
            <p className="text-[10px] font-black tracking-widest">WHERE</p>
            <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search here" className="w-full outline-none text-sm" />
          </div>
          <button className="bg-[#1a1a2e] text-white px-6 py-2 rounded-full font-bold text-sm">Search 🔍</button>
        </div>
        <select value={priceFilter} onChange={e => { setPriceFilter(e.target.value); setCurrentPage(1); }} className="border rounded-full px-5 py-3 bg-white font-bold text-sm shadow-sm outline-none">
          <option value="all">All Prices</option>
          <option value="low">Below ₹2000</option>
          <option value="mid">₹2000 - ₹3000</option>
          <option value="high">Above ₹3000</option>
        </select>
      </div>

      <h2 className="max-w-6xl mx-auto font-bold text-xl mt-8 mb-4">Top Luxury Stays <span className="text-gray-400 font-normal text-sm">{filtered.length} properties • Page {currentPage} of {totalPages || 1}</span></h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} onDelete={handleDelete} />)}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="border px-4 py-2 rounded-full text-sm font-bold disabled:opacity-40">← Previous</button>
        {[...Array(totalPages)].map((_,i)=><button key={i} onClick={()=>setCurrentPage(i+1)} className={`w-9 h-9 rounded-full font-bold ${currentPage===i+1?'bg-[#1a1a2e] text-white':'border'}`}>{i+1}</button>)}
        <button disabled={currentPage===totalPages || totalPages===0} onClick={()=>setCurrentPage(p=>p+1)} className="border px-4 py-2 rounded-full text-sm font-bold disabled:opacity-40">Next →</button>
      </div>
    </div>
  );
}