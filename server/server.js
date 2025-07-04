const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const toolRoutes = require('./routes/toolRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ AI StudyMate backend is running with MongoDB!');
});

// ✅ Seed function — inserts sample tools (once)
const seedTools = async () => {
  const Tool = require('./models/Tool'); // Scoped here
  const count = await Tool.countDocuments();
  if (count === 0) {
    await Tool.insertMany([
      {
        name: "ChatGPT",
        description: "AI chatbot by OpenAI",
        category: "Productivity",
        logo: "https://chat.openai.com/favicon.ico",
        link: "https://chat.openai.com",
        isFree: true,
      },
      {
        name: "Jasper AI",
        description: "AI content writer",
        category: "Writing",
        logo: "https://www.jasper.ai/favicon.ico",
        link: "https://www.jasper.ai",
        isFree: false,
      }
    ]);
    console.log("✅ Sample tools added to MongoDB.");
  }
};

// ✅ Connect to MongoDB, then seed and start server
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedTools();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
