import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="aboutus-container">
      <h1>About AI StudyMate</h1>

      <ul className="aboutus-list">
        <li>🎓 Designed to help students discover useful AI tools easily</li>
        <li>📌 Categorized tools: Writing, Editing, Coding, Math, and more</li>
        <li>💡 Clear labels for Free vs. Paid tools</li>
        <li>🚀 Built by Yogesh Yadav — passionate about AI + student productivity</li>
        <li>📬 Always growing — new tools added regularly</li>
      </ul>

      <div className="aboutus-connect">
        <h3>Connect with Me</h3>
        <p>Email: <a href="yogeshrao5024@gmail.com">yogeshsrao5024@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/GitFlow-Yogesh" target="_blank" rel="noreferrer">https://github.com/GitFlow-Yogesh</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/yogesh-yadav24" target="_blank" rel="noreferrer">linkedin.com/in/yogesh-yadav24</a></p>
      </div>
    </div>
  );
};

export default About;
