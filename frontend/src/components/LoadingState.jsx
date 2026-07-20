import React from 'react';

function LoadingState({ message }) {
  return (
    <div className="page-container fade-in">
      <div className="loading-state">
        <div className="pulse-beam"></div>
        <div className="loading-text">{message || 'Loading...'}</div>
      </div>
    </div>
  );
}

export default LoadingState;
