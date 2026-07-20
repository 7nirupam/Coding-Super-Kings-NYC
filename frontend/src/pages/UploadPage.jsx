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
      // For this demo flow, we can advance automatically or wait for user to click next
      // Let's hold on this page to show the success state snippet, then let them click next
      setTimeout(() => {
        onNext(data);
      }, 800);
    } catch (err) {
      setError("We couldn't read that resume. Please try a text-based PDF.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Extracting your resume..." />;
  }

  return (
    <div className="page-container fade-in">
      <div className="hero-header beam-sweep">
        <h1 className="display-text">Stop retyping your resume.</h1>
        <p>Beam your background straight into any job application.</p>
      </div>

      {!parsedSnippet ? (
        <ResumeDropzone onFileSelect={handleFileSelect} />
      ) : (
        <div className="dropzone success">
          <div className="dropzone-text" style={{ color: 'var(--beam-gold)' }}>Ready to beam!</div>
          <div className="dropzone-subtext">Found resume for {parsedSnippet}</div>
        </div>
      )}

      {error && <p className="error-text" style={{textAlign: 'center'}}>{error}</p>}
    </div>
  );
}

export default UploadPage;
