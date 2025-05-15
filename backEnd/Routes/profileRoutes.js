const express = require('express');
const multer = require('multer');
const Profile = require('../models/Profile');
const { verifyTokenMiddleware, verifyAdmin } = require('../Middleware/authMiddleware');

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Ensure this folder exists
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// --- Add Profile ---
router.post(
  '/addProfile',
  verifyTokenMiddleware,
  verifyAdmin,
  upload.single('photograph'),
  async (req, res) => {
    try {
      const { profilename, description } = req.body;
      const photograph = req.file?.filename;

      if (!profilename || !description) {
        return res.status(400).json({ error: 'Profilename and description are required.' });
      }

      const existingProfile = await Profile.findOne({ name: profilename });
      if (existingProfile) {
        return res.status(409).json({ message: 'Profile already exists' });
      }

      const profile = new Profile({ name: profilename, description, photograph });
      await profile.save();
      return res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (err) {
      console.error('[ADD PROFILE ERROR]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// --- Update Profile ---
router.put(
  '/updateProfile/:id',
  verifyTokenMiddleware,
  verifyAdmin,
  upload.single('photograph'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { profilename, description } = req.body;
      const photograph = req.file?.filename;

      const updateData = {};
      if (profilename) updateData.name = profilename;
      if (description) updateData.description = description;
      if (photograph) updateData.photograph = photograph;

      const updated = await Profile.findByIdAndUpdate(id, updateData, { new: true });

      if (!updated) return res.status(404).json({ message: 'Profile not found' });

      return res.json({ message: 'Profile updated', profile: updated });
    } catch (err) {
      console.error('[UPDATE PROFILE ERROR]', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// --- Delete Profile ---
router.delete('/deleteProfile/:id', verifyTokenMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Profile.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Profile not found' });

    return res.json({ message: 'Profile deleted' });
  } catch (err) {
    console.error('[DELETE PROFILE ERROR]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// --- Get All Profiles ---
router.get('/getProfiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    return res.json(profiles);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// --- Get Single Profile ---
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

// --- Search Profiles ---
router.get('/searchProfiles', async (req, res) => {
  try {
    const { name, description } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description) filter.description = { $regex: description, $options: 'i' };

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
