import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteProfile = ({ profileId, onDeleted }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await axios.delete(`/api/profile/deleteProfile/${profileId}`);
        alert('Profile deleted successfully');
        onDeleted(); // callback to refresh list
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting profile');
      }
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteProfile;
