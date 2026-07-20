import React, { useEffect, useState } from 'react';

function SessionStatsBanner() {
  const [stats, setStats] = useState({ timeSaved: 0, fieldsFilled: 0 });

  const loadStats = () => {
    const timeSaved = parseInt(sessionStorage.getItem('totalTimeSavedSeconds') || '0', 10);
    const fieldsFilled = parseInt(sessionStorage.getItem('totalFieldsFilled') || '0', 10);
    setStats({ timeSaved, fieldsFilled });
  };

  useEffect(() => {
    loadStats();
    
    // Listen for custom event triggered when a new packet is generated
    const handleStatsUpdate = () => loadStats();
    window.addEventListener('beamStatsUpdated', handleStatsUpdate);
    
    return () => window.removeEventListener('beamStatsUpdated', handleStatsUpdate);
  }, []);

  if (stats.timeSaved === 0 && stats.fieldsFilled === 0) return null;

  const minutesSaved = Math.floor(stats.timeSaved / 60);
  const secondsSaved = stats.timeSaved % 60;
  
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'var(--beam-gold, #ffb300)',
      color: 'var(--space-black, #1a1a1a)',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      fontWeight: '600',
      zIndex: 1000,
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <span style={{ fontSize: '1.25rem' }}>✨</span>
      <span>
        Saved so far: {minutesSaved}m {secondsSaved}s · {stats.fieldsFilled} fields typed
      </span>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default SessionStatsBanner;
