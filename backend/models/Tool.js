const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  logo: String,       // Hosted image URL
  website: String,    // Tool website link (renamed from 'link')
  isFree: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tool', toolSchema);
