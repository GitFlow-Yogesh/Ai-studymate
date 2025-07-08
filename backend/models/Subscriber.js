const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ✅ prevent duplicate entries
    lowercase: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
