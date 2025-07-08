import React, { useEffect, useState } from 'react';
import ToolCard from './ToolCard';
import './ToolCard.css';
import { usePagination } from '../context/PaginationContext';
import axios from 'axios';

const ToolList = ({ filter, category, setCategory }) => {
  const { currentPage, setCurrentPage } = usePagination();
  const toolsPerPage = 12;

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);

  // Fetch all tools
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tools');
        setTools(res.data);
      } catch (err) {
        console.error('Failed to fetch tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Reset scroll and pagination when filter/category changes
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter, category]);

  // Step 1: Filter tools by Free or Paid
  let filteredTools = tools;
  if (filter === 'free') filteredTools = tools.filter((tool) => tool.isFree);
  if (filter === 'paid') filteredTools = tools.filter((tool) => !tool.isFree);

  // Step 2: Extract categories available in current filteredTools
  useEffect(() => {
    if (filter) {
      const cats = [
        ...new Set(filteredTools.map((tool) => tool.category).filter(Boolean)),
      ];
      setAvailableCategories(cats);
    } else {
      setAvailableCategories([]);
    }
  }, [filter, tools]);

  // Step 3: Filter again if category is selected
  if (category) {
    filteredTools = filteredTools.filter(
      (tool) =>
        (tool.category || '').toLowerCase() === category.toLowerCase()
    );
  }

  // Pagination
  const startIndex = (currentPage - 1) * toolsPerPage;
  const currentTools = filteredTools.slice(
    startIndex,
    startIndex + toolsPerPage
  );
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        🔥 Explore AI Tools
      </h2>

      {/* 🟢 Categories shown only when filter is Free or Paid */}
      {filter && availableCategories.length > 0 && (
        <div className="category-box">
          <div className="categories-scroll">
            {availableCategories.map((cat, index) => (
              <span
                key={index}
                onClick={() =>
                  setCategory((prev) => (prev === cat ? null : cat))
                }
                className={
                  category === cat ? 'active-category' : 'category-item'
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tool Cards */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading tools...</p>
      ) : (
        <div className="tool-list-container">
          {currentTools.length > 0 ? (
            currentTools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#888' }}>
              No tools found for selected filters.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredTools.length > toolsPerPage && (
        <div className="pagination-container">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          >
            ❮ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            Next ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolList;
