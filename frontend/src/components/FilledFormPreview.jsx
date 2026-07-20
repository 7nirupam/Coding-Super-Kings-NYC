import React, { useState, useEffect } from 'react';

function FilledFormPreview({ packet }) {
  const [filledCount, setFilledCount] = useState(0);
  
  // Extract fields into an array so we can map and animate them sequentially
  const fields = [
    { id: 'fullName', label: 'Full Name', value: packet.filledFields?.fullName || '' },
    { id: 'email', label: 'Email Address', value: packet.filledFields?.email || '' },
    { id: 'phone', label: 'Phone Number', value: packet.filledFields?.phone || '' },
    { id: 'education', label: 'Education History', value: packet.filledFields?.education || '' },
    { id: 'experience', label: 'Work Experience', value: packet.filledFields?.experience || '' },
    { id: 'coverLetter', label: 'Cover Letter / Summary', value: packet.tailoredSummary || packet.filledFields?.coverLetter || '' }
  ];

  useEffect(() => {
    if (filledCount < fields.length) {
      const timer = setTimeout(() => {
        setFilledCount(prev => prev + 1);
      }, 200); // 200ms stagger
      return () => clearTimeout(timer);
    }
  }, [filledCount, fields.length]);

  const traceHeight = fields.length > 0 ? `${(filledCount / fields.length) * 100}%` : '0%';

  return (
    <div className="beam-way-container">
      <div className="column-header">
        <h3>With Beam</h3>
        <p>1 click, 8 seconds</p>
      </div>

      <form className="beam-form" onSubmit={e => e.preventDefault()}>
        <div className="beam-trace" style={{ height: traceHeight }}></div>
        
        {fields.map((field, index) => {
          const isVisible = index < filledCount;
          const isJustFilled = index === filledCount - 1;
          
          return (
            <div 
              key={field.id} 
              className={`beam-field ${isVisible ? 'visible' : ''} ${isJustFilled ? 'just-filled' : ''}`}
            >
              <label>{field.label}</label>
              {field.id === 'education' || field.id === 'experience' || field.id === 'coverLetter' ? (
                <textarea 
                  className="beam-textarea"
                  value={isVisible ? field.value : ''} 
                  readOnly 
                  style={{ height: field.id === 'experience' ? '120px' : '80px' }}
                />
              ) : (
                <input 
                  type={field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'}
                  className="beam-input" 
                  value={isVisible ? field.value : ''} 
                  readOnly 
                />
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default FilledFormPreview;
