import React, { useState, useRef } from 'react';

function ResumeDropzone({ onFileSelect, loading }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`dropzone ${isDragOver ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!loading ? handleClick : undefined}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!loading) handleClick();
        }
      }}
    >
      {loading ? (
        <>
          <div className="pulse-beam"></div>
          <div className="dropzone-text">Reading your resume...</div>
        </>
      ) : (
        <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        style={{ display: 'none' }} 
        accept=".pdf,.txt" 
      />
      <div className="dropzone-text">Drop your resume here, or click to browse</div>
      <div className="dropzone-subtext">PDF or Text files supported</div>
      </>
      )}
    </div>
  );
}

export default ResumeDropzone;
