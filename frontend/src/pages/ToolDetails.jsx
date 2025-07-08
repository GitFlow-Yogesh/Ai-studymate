import React from 'react';
import { useParams } from 'react-router-dom';

const ToolDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Tool Details Page</h2>
      <p>Details for Tool ID: {id}</p>
    </div>
  );
};

export default ToolDetails;
