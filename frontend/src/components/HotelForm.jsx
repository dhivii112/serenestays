import React, { useState, useEffect } from 'react';

const HotelForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        latitude: initialData.latitude || '',
        longitude: initialData.longitude || '',
        price: initialData.price || '',
      });
      if (initialData.image_path) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        setPreview(`${backendUrl}/${initialData.image_path}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.latitude || isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude must be a valid number between -90 and 90';
    }
    if (!formData.longitude || isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude must be a valid number between -180 and 180';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a number greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append('image', image);
      }
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form">
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Latitude</label>
        <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} />
        {errors.latitude && <span className="error">{errors.latitude}</span>}
      </div>

      <div className="form-group">
        <label>Longitude</label>
        <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} />
        {errors.longitude && <span className="error">{errors.longitude}</span>}
      </div>

      <div className="form-group">
        <label>Price</label>
        <input type="number" step="any" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="image-preview" />}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default HotelForm;
