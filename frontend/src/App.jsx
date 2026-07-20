import React, { useState } from 'react';
import ProfilePage from './pages/ProfilePage';
import JobInputPage from './pages/JobInputPage';
import ResultPage from './pages/ResultPage';
import SessionStatsBanner from './components/SessionStatsBanner';
import './styles/index.css';

function App() {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState(null);
  const [jobData, setJobData] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="beam-wordmark"><span>Beam</span>App</div>
      </header>
      <SessionStatsBanner />
      {step === 1 && (
        <ProfilePage 
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
