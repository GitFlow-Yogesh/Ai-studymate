import React, { useState, useEffect, useMemo } from 'react';
import './ToolCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  const [showWhat, setShowWhat] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [likes, setLikes] = useState(tool.likes || 0);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  // ✅ Memoize likedTools to avoid unstable dependency warning
  const likedTools = useMemo(() => {
    return Array.isArray(user?.likedTools) ? user.likedTools : [];
  }, [user]);

  // ✅ Set initial liked state
  useEffect(() => {
    setLiked(likedTools.includes(tool._id));
  }, [tool._id, likedTools]);

  // ✅ Listen for login/logout changes
  useEffect(() => {
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
      const isNowLiked = updatedUser?.likedTools?.includes(tool._id);
      setLiked(!!isNowLiked);
    };

    window.addEventListener('user-logged-in', updateUser);
    window.addEventListener('user-logged-out', updateUser);

    return () => {
      window.removeEventListener('user-logged-in', updateUser);
      window.removeEventListener('user-logged-out', updateUser);
    };
  }, [tool._id]);

  const handleLikeToggle = async () => {
    const freshUser = JSON.parse(localStorage.getItem('user'));

    if (!freshUser?.id || !freshUser?.name || !freshUser?.email) {
      navigate('/login');
      return;
    }

    const endpoint = liked
      ? 'http://localhost:5000/api/tools/unlike'
      : 'http://localhost:5000/api/tools/like';

    try {
      const res = await axios.post(endpoint, {
        toolId: tool._id,
        userId: freshUser.id,
      });

      if (res.data.success) {
        const updatedLikedTools = liked
          ? freshUser.likedTools.filter(id => id !== tool._id)
          : [...(freshUser.likedTools || []), tool._id];

        const updatedUser = { ...freshUser, likedTools: updatedLikedTools };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setLiked(!liked);
        setLikes(res.data.likes);
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const logoSrc = tool.logo?.startsWith('http') ? tool.logo : `/logos/${tool.logo || 'default.png'}`;
  const toolWebsite = tool.website || '#';

  return (
    <div className="tool-card-wrapper">
      <div className="tool-card">
        <div className="tool-header">
          <img src={logoSrc} alt={tool.name || 'Tool Logo'} className="tool-logo" />
          <div className="tool-info">
            <h3 className="tool-title">{tool.name || 'Unknown Tool'}</h3>
            <p className="tool-description">{tool.description || 'No description available.'}</p>
          </div>
          <div className={`badge ${tool.isFree ? 'free' : 'paid'}`}>
            {tool.isFree ? 'Free' : 'Paid'}
          </div>
        </div>

        <div className="tool-buttons">
          <button onClick={() => setShowWhat(!showWhat)} className="toggle-btn">What It Does</button>
          <button onClick={() => setShowHow(!showHow)} className="toggle-btn">How to Use</button>
        </div>

        {showWhat && (
          <div className="expand-section">
            <h4 className="section-heading">💡 What It Does</h4>
            <p className="section-text">{tool.whatItDoes || 'Information not available.'}</p>
          </div>
        )}

        {showHow && Array.isArray(tool.howToUse) && (
          <div className="expand-section">
            <h4 className="section-heading">🛠️ How to Use</h4>
            <ol className="usage-steps">
              {tool.howToUse.map((step, index) => (
                <li key={index}><span className="step-text">{step}</span></li>
              ))}
            </ol>
          </div>
        )}



        <div className="tool-actions">
          <a href={toolWebsite} target="_blank" rel="noopener noreferrer" className="try-btn">
            Try Now
          </a>
          <button onClick={handleLikeToggle} className="fav-btn">
            {liked ? '💔 Remove Fav' : '❤️ Add to Fav'}
          </button>
        </div>
        <div className="like-count-wrapper">
          <p className="like-count">❤️ {likes} students found this helpful</p>
        </div>

      </div>
    </div>
  );
};

export default ToolCard;
