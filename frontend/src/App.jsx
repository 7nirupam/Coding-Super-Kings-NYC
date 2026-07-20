import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import JobInputPage from './pages/JobInputPage';
import ResultPage from './pages/ResultPage';
import './styles/index.css';

function App() {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState(null);
  const [jobData, setJobData] = useState(null);

  return (
    <div className="app-container">
      {step === 1 && (
        <UploadPage 
          onNext={(data) => { setResumeData(data); setStep(2); }} 
        />
      )}
      {step === 2 && (
        <JobInputPage 
          onNext={(data) => { setJobData(data); setStep(3); }} 
          onBack={() => setStep(1)} 
        />
      )}
      {step === 3 && (
        <ResultPage 
          resumeData={resumeData} 
          jobData={jobData} 
          onReset={() => { setResumeData(null); setJobData(null); setStep(1); }} 
        />
      )}
    </div>
  );
}

export default App;
