import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProfile = ({ profileId }) => {
  const [profile, setProfile] = useState({});
  const [profilename, setProfilename] = useState('');
  const [description, setDescription] = useState('');
  const [photograph, setPhotograph] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`/api/profile/getProfile/${profileId}`);
      setProfile(res.data);
      setProfilename(res.data.name);
      setDescription(res.data.description);
    };
    fetchProfile();
  }, [profileId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilename) formData.append('profilename', profilename);
    if (description) formData.append('description', description);
    if (photograph) formData.append('photograph', photograph);

    try {
      await axios.put(`/api/profile/updateProfile/${profileId}`, formData);
      alert('Profile updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Update Profile</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Profile Name</label>
          <input type="text" className="form-control" value={profilename} onChange={(e) => setProfilename(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">New Photograph (optional)</label>
          <input type="file" className="form-control" onChange={(e) => setPhotograph(e.target.files[0])} />
        </div>
        <button className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
