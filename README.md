# AI StudyMate 🎓🤖

**AI StudyMate** is a full-stack MERN web application that helps students explore, categorize, and utilize powerful AI tools for learning and productivity.

---

## 🚀 Features

- 🔍 Browse curated AI tools with clear categories (Free / Paid)
- 🧠 View tool usage instructions, categories, and logos
- ❤️ Like your favorite tools (requires login)
- 📨 Subscribe with email for updates
- 🧾 Contact form for feedback/support
- 👤 Simple login system (Name + Email)
- ✅ Fully responsive design (works on all devices)

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Context API
- Tailwind CSS
- Responsive UI Design

**Backend:**
- Node.js + Express
- MongoDB (via MongoDB Atlas)
- Mongoose ODM
- JWT for simple auth (Name + Email)

---

## 📁 Folder Structure

🔧 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/GitFlow-Yogesh/ai-studymate.git
cd ai-studymate

2. Install backend dependencies
cd backend
npm install

3. Create .env inside /backend
MONGO_URI=your_mongo_db_connection_string

4. Run backend server=node server.js or npx nodemon server.js(if nodemon installed)
5. Install frontend dependencies=cd ../frontend    ,   npm install
6. Run frontend=npm start
