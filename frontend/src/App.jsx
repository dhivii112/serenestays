import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetailPage from './pages/HotelDetailPage';
import AddPage from './pages/AddPage';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-[#1a1a2e] text-white w-9 h-9 rounded-full flex items-center justify-center font-black">S</div>
        <span className="font-black text-xl tracking-tight">SereneStays</span>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold ml-2">Luxury Stays</span>
      </Link>
      <Link to="/add-hotel" className="bg-[#ff6b35] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-black transition">+ Add Hotel</Link>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/add-hotel" element={<AddPage />} />
          <Route path="/edit/:id" element={<AddPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;