
import React, { useState, useEffect } from 'react';
import './dashboard.css'; 
function Dashboard() {
  const [formData, setFormData] = useState({
    isVisible: true,
    description: '',
    timer: 10,
    link: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/banner')
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Banner Control Dashboard</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <label className="dashboard-label">
          Banner Visible:
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Banner Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Timer (seconds):
          <input
            type="number"
            name="timer"
            value={formData.timer}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Banner Link:
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <button type="submit" className="dashboard-button">Update Banner</button>
      </form>
    </div>
  );
}

export default Dashboard;