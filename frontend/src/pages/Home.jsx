import React, { useState } from 'react';
import ToolList from '../components/ToolList';
import './Home.css';

const Home = () => {
  const [filter, setFilter] = useState(null); // 'free' or 'paid'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilter = (type) => {
    if (filter === type) {
      // clicking again resets filter and category
      setFilter(null);
      setSelectedCategory(null);
    } else {
      setFilter(type);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="home-page">
      <h2 className="section-title">Browse Tools</h2>

      <div className="filter-buttons">
        <button
          onClick={() => handleFilter('free')}
          className={filter === 'free' ? 'active' : ''}
        >
          Free Tools
        </button>
        <button
          onClick={() => handleFilter('paid')}
          className={filter === 'paid' ? 'active' : ''}
        >
          Paid Tools
        </button>
      </div>

      <ToolList
        filter={filter}
        category={selectedCategory}
        setCategory={setSelectedCategory}
      />
    </div>
  );
};

export default Home;
