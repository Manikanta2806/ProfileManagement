import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Context/Authcontext'; // Adjust path if needed

const AddProfile = () => {
  const { token, logout } = useAuth();

  const [profilename, setProfilename] = useState('');
  const [description, setDescription] = useState('');
  const [photograph, setPhotograph] = useState(null);

  const handleAddProfile = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('You must be logged in to add a profile.');
      return;
    }

    const formData = new FormData();
    formData.append('profilename', profilename);
    formData.append('description', description);
    if (photograph) formData.append('photograph', photograph);

    try {
      await axios.post('http://localhost:4000/api/profile/addProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile added successfully');
      setProfilename('');
      setDescription('');
      setPhotograph(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding profile');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Add New Profile</h3>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleAddProfile}>
        <div className="mb-3">
          <label className="form-label">Profile Name</label>
          <input type="text" className="form-control" value={profilename} onChange={(e) => setProfilename(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Photograph</label>
          <input type="file" className="form-control" onChange={(e) => setPhotograph(e.target.files[0])} />
        </div>
        <button className="btn btn-success">Add Profile</button>
      </form>
    </div>
  );
};

export default AddProfile;
