import React from 'react';

function ReadinessGauge({ score }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let label = "Consider strengthening your profile";
  let color = "var(--error-red, #e74c3c)";

  if (score >= 80) {
    label = "Strong match";
    color = "var(--beam-gold, #ffb300)";
  } else if (score >= 50) {
    label = "Good match, worth applying";
    color = "var(--info-blue, #3498db)";
  }

  return (
    <div className="readiness-gauge" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', backgroundColor: 'var(--surface-light, #f8f9fa)', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--space-black)' }}>
          {score}%
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Readiness Score</h4>
        <p style={{ margin: 0, color: 'var(--graphite, #555)', fontSize: '0.9rem' }}>{label}</p>
      </div>
    </div>
  );
}

export default ReadinessGauge;
