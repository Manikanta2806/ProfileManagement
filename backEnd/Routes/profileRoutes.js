const express = require('express');
const Profile = require('../models/Profile'); 
const { verifyTokenMiddleware, verifyAdmin } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/addProfile', verifyTokenMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { photograph, name, description } = req.body;

    const existingProfile = await Profile.findOne({ name });
    if (existingProfile) {
      return res.status(409).json({ message: 'Profile already exists' });
    }

    const profile = new Profile({ photograph, name, description });

    await profile.save();
    return res.status(201).json({ message: 'Profile created successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});


router.put('/updateProfile/:id', verifyTokenMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { photograph, name, description } = req.body;

    const updated = await Profile.findByIdAndUpdate(
      id,
      { photograph, name, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Profile not found' });

    return res.json({ message: 'Profile updated', profile: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/deleteProfile/:id', verifyTokenMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Profile.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Profile not found' });

    return res.json({ message: 'Profile deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});


router.get('/getProfiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    return res.json(profiles);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getProfile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/searchProfiles', async (req, res) => {
  try {
    const { name, description } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (description) {
      filter.description = { $regex: description, $options: 'i' };
    }

    const profiles = await Profile.find(filter);

    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No matching profiles found' });
    }

    return res.json(profiles);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
