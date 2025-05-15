import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext'; // Adjust the path based on your project structure

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const res = await axios.post('http://localhost:4000/api/users/login', formData);
      const { token, userId } = res.data;

      login(token, userId); // Set in context and localStorage

      alert('Login successful!');
      navigate('/'); // redirect to home page
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div
      className="login-page d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/vibrant-pink-watercolor-painting-background_53876-58931.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#ffffffee',
          borderRadius: '1rem',
        }}
      >
        <h2 className="text-center mb-4 text-success">Login</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
