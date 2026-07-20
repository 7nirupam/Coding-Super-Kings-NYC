import React, { useState, useEffect } from 'react';

function LoadingState({ message }) {
  const [dots, setDots] = useState('');
  const [text, setText] = useState(message || 'Loading');

  useEffect(() => {
    // If no custom message is provided, rotate default statuses for long waits
    if (!message) {
      const statuses = ["Reading the job posting", "Matching your experience", "Almost there"];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % statuses.length;
        setText(statuses[i]);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [message]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="page-container fade-in">
      <div className="loading-state">
        <div className="pulse-beam"></div>
        <div className="loading-text">{text}{dots}</div>
      </div>
    </div>
  );
}

export default LoadingState;
