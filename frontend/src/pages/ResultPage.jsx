import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';
import OldWayMock from '../components/OldWayMock';
import FilledFormPreview from '../components/FilledFormPreview';
import ClickCounter from '../components/ClickCounter';
import LoadingState from '../components/LoadingState';

function ResultPage({ resumeData, jobData, onReset }) {
  const [loading, setLoading] = useState(true);
  const [packet, setPacket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function generate() {
      try {
        const data = await apiClient.generatePacket(resumeData, jobData);
        setPacket(data);
      } catch (err) {
        setError("Failed to generate application packet. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, [resumeData, jobData]);

  if (loading) {
    return <LoadingState message="Beaming your application details" />;
  }

  if (error) {
    return (
      <div className="page-container fade-in">
        <div className="hero-header">
          <h2>Oops.</h2>
          <p className="error-text">{error}</p>
          <div className="action-row" style={{justifyContent: 'center'}}>
             <button className="btn-secondary" onClick={onReset}>Start Over</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ maxWidth: '1200px', paddingTop: '2rem' }}>
      
      <div className="click-counter-wrapper">
        <ClickCounter packet={packet} totalFields={6} />
      </div>

      <div className="result-layout">
        <OldWayMock />
        <div className="divider-beam"></div>
        <FilledFormPreview packet={packet} />
      </div>

      <div className="action-row" style={{ justifyContent: 'center', marginTop: '4rem' }}>
         <button className="btn-secondary" onClick={() => window.location.reload()}>Try another job posting</button>
         <button className="btn-secondary" onClick={onReset}>Start Over</button>
      </div>
    </div>
  );
}

export default ResultPage;
