const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 🔐 Register or Login based on email
router.post('/login', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, likedTools: [] });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '2h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        likedTools: user.likedTools || [],
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
