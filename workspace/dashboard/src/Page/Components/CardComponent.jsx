// src/components/MetricsCard.js
import React from 'react';
import '../Style/Card.css';

const CardComponent = ({ title, value, description }) => {
  return (
    <div className="card mt-3">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      <div className="card-description">{description}</div>
    </div>
  );
};

export default CardComponent;
