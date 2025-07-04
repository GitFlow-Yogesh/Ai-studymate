const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const User = require('../models/User');

// ✅ GET all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET single tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new tool
router.post('/', async (req, res) => {
  const { name, description, category, logo, website, isFree } = req.body;

  const newTool = new Tool({
    name,
    description,
    category,
    logo,
    website,
    isFree
  });

  try {
    const savedTool = await newTool.save();
    res.status(201).json(savedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT (update) tool by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTool) return res.status(404).json({ message: 'Tool not found' });
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE tool by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTool = await Tool.findByIdAndDelete(req.params.id);
    if (!deletedTool) return res.status(404).json({ message: 'Tool not found' });
    res.json({ message: 'Tool deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LIKE a tool
router.post('/like', async (req, res) => {
  const { toolId, name, email, userId } = req.body;

  if (!toolId || (!userId && (!name || !email))) {
    return res.status(400).json({ message: 'Tool ID and user info required' });
  }

  try {
    let user = userId ? await User.findById(userId) : await User.findOne({ email });
    if (!user && name && email) {
      user = await new User({ name, email, likedTools: [] }).save();
    }

    if (!user) return res.status(401).json({ message: 'Invalid user' });

    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });

    if (user.likedTools.includes(toolId)) {
      return res.status(400).json({ message: 'Tool already liked' });
    }

    tool.likes = (tool.likes || 0) + 1;
    await tool.save();

    user.likedTools.push(toolId);
    await user.save();

    res.json({
      success: true,
      message: 'Liked successfully',
      likes: tool.likes,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        likedTools: user.likedTools
      }
    });
  } catch (error) {
    console.error('Error in /like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ UNLIKE a tool
router.post('/unlike', async (req, res) => {
  const { toolId, userId } = req.body;

  if (!toolId || !userId) {
    return res.status(400).json({ message: 'Tool ID and User ID required' });
  }

  try {
    const user = await User.findById(userId);
    const tool = await Tool.findById(toolId);

    if (!user || !tool) {
      return res.status(404).json({ message: 'User or Tool not found' });
    }

    if (!user.likedTools.includes(toolId)) {
      return res.status(400).json({ message: 'Tool was not liked before' });
    }

    tool.likes = Math.max(0, (tool.likes || 0) - 1);
    await tool.save();

    user.likedTools = user.likedTools.filter(id => id.toString() !== toolId.toString());
    await user.save();

    res.json({
      success: true,
      message: 'Unliked successfully',
      likes: tool.likes,
      user: {
        id: user._id,
        likedTools: user.likedTools
      }
    });
  } catch (error) {
    console.error('Error in /unlike:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
