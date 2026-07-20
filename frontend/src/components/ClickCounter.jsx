import React, { useEffect, useState } from 'react';

function ClickCounter({ packet, totalFields }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the counter after a delay, to let the form fill animation complete
    const delay = (totalFields * 200) + 500;
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [totalFields]);

  return (
    <div className={`click-counter ${visible ? 'visible' : ''}`}>
      <div className="stat-row">
        <span className="stat-old">47 fields, ~12 min</span>
        <span className="stat-arrow">→</span>
        <span className="stat-new">1 click, 8 sec</span>
      </div>
      <p style={{ color: 'var(--graphite)', marginTop: '0.5rem' }}>
        Actual fields filled: {packet?.fieldsFilledCount || 0} | Estimated Time Saved: {Math.round((packet?.estimatedTimeSavedSeconds || 0) / 60)} minutes
      </p>
    </div>
  );
}

export default ClickCounter;
