import React, { useState } from 'react';
import { apiClient } from '../api/apiClient';
import LoadingState from '../components/LoadingState';

function JobInputPage({ onNext, onBack }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleParseJob = async () => {
    if (!text.trim()) {
      setError("We need a job description to match against.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.parseJob(text);
      onNext(data);
    } catch (err) {
      setError("We couldn't parse that job description. Ensure it contains actual text.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="page-container fade-in">
      <div className="hero-header">
        <h2 className="display-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Paste the job you're applying to.</h2>
      </div>

      <textarea 
        className="job-textarea"
        placeholder="e.g. Seeking a Senior Software Engineer with 5+ years of experience in Java, Spring Boot, and React..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      
      <div className="divider"><span>or paste a link</span></div>
      <input type="text" className="job-url-input" placeholder="https://linkedin.com/jobs/..." />
      
      {error && <p className="error-text">{error}</p>}
      
      <div className="action-row">
        <button className="btn-secondary" onClick={onBack} disabled={loading}>Back</button>
        <button className="btn-primary" onClick={handleParseJob} disabled={loading || !text.trim()}>
          Fill this application
        </button>
      </div>
    </div>
  );
}

export default JobInputPage;
