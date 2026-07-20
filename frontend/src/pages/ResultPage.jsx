import React, { useState, useEffect } from 'react';
import { generatePacket } from '../utils/matchingEngine';
import OldWayMock from '../components/OldWayMock';
import FilledFormPreview from '../components/FilledFormPreview';
import ClickCounter from '../components/ClickCounter';
import LoadingState from '../components/LoadingState';
import ReadinessGauge from '../components/ReadinessGauge';

function ResultPage({ resumeData, jobData, onReset }) {
  const [loading, setLoading] = useState(true);
  const [packet, setPacket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function generate() {
      try {
        // Deterministic generation
        const data = generatePacket(resumeData, jobData);
        
        // Update Session Stats
        const currentSavedTime = parseInt(sessionStorage.getItem('totalTimeSavedSeconds') || '0', 10);
        const currentFieldsFilled = parseInt(sessionStorage.getItem('totalFieldsFilled') || '0', 10);
        
        sessionStorage.setItem('totalTimeSavedSeconds', currentSavedTime + (data.estimatedTimeSavedSeconds || 0));
        sessionStorage.setItem('totalFieldsFilled', currentFieldsFilled + (data.fieldsFilledCount || 0));
        
        // Dispatch event to update the banner
        window.dispatchEvent(new Event('beamStatsUpdated'));

        // Slight delay for UI transition effect
        setTimeout(() => {
          setPacket(data);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to generate application packet. Please try again.");
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

  const handleCopy = () => {
    if (!packet) return;
    const text = `Cover Letter:\n${packet.tailoredSummary}\n\nFields:\n${Object.entries(packet.filledFields)
      .filter(([k]) => k !== 'coverLetter')
      .map(([k, v]) => `${k}:\n${v}`)
      .join('\n\n')}`;
    navigator.clipboard.writeText(text);
    alert('Application copied to clipboard!');
  };

  const handleDownload = () => {
    if (!packet) return;
    const text = `Cover Letter:\n${packet.tailoredSummary}\n\nFields:\n${Object.entries(packet.filledFields)
      .filter(([k]) => k !== 'coverLetter')
      .map(([k, v]) => `${k}:\n${v}`)
      .join('\n\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Beam_Application.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container fade-in" style={{ maxWidth: '1200px', paddingTop: '2rem' }}>
      
      <div className="click-counter-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ClickCounter packet={packet} totalFields={6} />
        {packet && <ReadinessGauge score={packet.readinessScore || 0} />}
        {packet && packet.missingSkills && packet.missingSkills.length > 0 && (
          <div style={{ backgroundColor: 'var(--surface-light, #f8f9fa)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--info-blue, #3498db)' }}>
            <strong>Skill Gap Tip:</strong> Adding <strong>{packet.missingSkills[0]}</strong> to your profile would improve your match.
          </div>
        )}
      </div>

      <div className="result-layout">
        <OldWayMock />
        <div className="divider-beam"></div>
        <FilledFormPreview packet={packet} />
      </div>

      <div className="action-row" style={{ justifyContent: 'center', marginTop: '4rem', gap: '1rem', flexWrap: 'wrap' }}>
         <button className="btn-primary" onClick={handleCopy}>Copy Application</button>
         <button className="btn-secondary" onClick={handleDownload}>Download as .txt</button>
         <button className="btn-secondary" onClick={() => window.location.reload()}>Try another job posting</button>
         <button className="btn-secondary" onClick={onReset}>Start Over</button>
      </div>
    </div>
  );
}

export default ResultPage;
