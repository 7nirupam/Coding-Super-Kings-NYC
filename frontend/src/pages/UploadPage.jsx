import React, { useState } from 'react';
import { apiClient } from '../api/apiClient';
import ResumeDropzone from '../components/ResumeDropzone';
import LoadingState from '../components/LoadingState';

function UploadPage({ onNext }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [parsedSnippet, setParsedSnippet] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.uploadResume(selectedFile);
      setParsedSnippet(data.name || "Resume");
      // Wait for user to click Continue

    } catch (err) {
      setError("We couldn't read that resume. Please try a text-based PDF.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  // Removed LoadingState replacement so Dropzone can handle the loading state


  return (
    <div className="page-container fade-in">
      <div className="hero-header beam-sweep">
        <h1 className="display-text">Stop retyping your resume.</h1>
        <p>Upload once. Beam fills every application after that.</p>
      </div>

      {!parsedSnippet ? (
        <ResumeDropzone onFileSelect={handleFileSelect} loading={loading} />
      ) : (
        <div className="dropzone success">
          <div className="dropzone-text" style={{ color: 'var(--beam-gold)' }}>✓ Parsed: {parsedSnippet}</div>
          <div className="action-row" style={{ marginTop: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => onNext({ name: parsedSnippet })}>Continue</button>
          </div>
        </div>
      )}

      {error && <p className="error-text" style={{textAlign: 'center'}}>{error}</p>}
    </div>
  );
}

export default UploadPage;
