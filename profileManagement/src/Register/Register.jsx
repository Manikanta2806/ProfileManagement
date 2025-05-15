import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/users/register', formData);
      console.log('Backend response:', res.data);
      alert('Registration successful!');
      navigate('/login'); 
    } catch (err) {
      console.error('Error submitting form:', err.response?.data || err.message);
      alert('Registration failed!');
    }
  };

  return (
    <div
      className="register-page d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('https://slidechef.net/wp-content/uploads/2023/09/PINK-BACKGROUND.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px'
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', backgroundColor: '#ffffffee', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 text-primary">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
