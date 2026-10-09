import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit =!!id;
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '', location: '', price: '', description: '',
    image_path: '', latitude: '', longitude: ''
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}/${id}`).then(res => {
        setForm(res.data);
      });
    }
  }, [id, isEdit]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}/upload`, fd);
      setForm({...form, image_path: res.data.imageUrl });
    } catch { alert('Upload failed da'); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
     ...form,
      price: Number(form.price),
      latitude: Number(form.latitude) || 10.4583,
      longitude: Number(form.longitude) || 77.52,
    };
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}/${id}`, payload);
        alert('Madurai Temple View Updated da! ✅');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hotels'}`, payload);
        alert('Added da!');
      }
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-4">{isEdit? `✏️ Edit - ${form.title}` : '+ Add New Hotel'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="border p-3 rounded-xl" placeholder="Hotel Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value })} />
        <input className="border p-3 rounded-xl" placeholder="Location" required value={form.location} onChange={e => setForm({...form, location: e.target.value })} />
        <input className="border p-3 rounded-xl" type="number" placeholder="Price" required value={form.price} onChange={e => setForm({...form, price: e.target.value })} />
        <textarea className="border p-3 rounded-xl" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-3 rounded-xl" type="number" step="any" placeholder="Latitude" value={form.latitude} onChange={e => setForm({...form, latitude: e.target.value })} />
          <input className="border p-3 rounded-xl" type="number" step="any" placeholder="Longitude" value={form.longitude} onChange={e => setForm({...form, longitude: e.target.value })} />
        </div>
        <div className="border-2 border-dashed p-4 rounded-xl text-center">
          <p className="font-bold text-sm">📸 Hotel Image</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 w-full text-sm" />
          {uploading && <p className="text-xs text-orange-500">Uploading da...</p>}
          {form.image_path && <img src={form.image_path} alt="preview" className="w-full h-[150px] object-cover rounded-xl mt-3" />}
        </div>

        {/* ITHU THAN DA SAVE CHANGES BUTTON */}
        <button type="submit" className="bg-[#ff6b35] text-white p-3 rounded-xl font-bold text-lg">
          {isEdit? '💾 Save Changes' : '➕ Add Hotel'}
        </button>
        <button type="button" onClick={() => navigate('/')} className="bg-gray-200 p-3 rounded-xl">Cancel</button>
      </form>
    </div>
  );
}