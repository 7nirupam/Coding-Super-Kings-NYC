import React from 'react';

function OldWayMock() {
  return (
    <div className="old-way-container">
      <div className="column-header">
        <h3>The Old Way</h3>
        <p>12 minutes of typing</p>
      </div>
      
      <form className="old-form" onSubmit={e => e.preventDefault()}>
        <div className="old-field">
          <label>Full Name</label>
          <input type="text" className="old-input" disabled />
        </div>
        
        <div className="old-field">
          <label>Email Address</label>
          <input type="email" className="old-input" disabled />
        </div>
        
        <div className="old-field">
          <label>Phone Number</label>
          <input type="tel" className="old-input" disabled />
        </div>
        
        <div className="old-field">
          <label>Education History</label>
          <textarea className="old-textarea" disabled></textarea>
        </div>
        
        <div className="old-field">
          <label>Work Experience</label>
          <textarea className="old-textarea" style={{height: '120px'}} disabled></textarea>
        </div>
        
        <div className="old-field">
          <label>Cover Letter</label>
          <textarea className="old-textarea" disabled></textarea>
        </div>
      </form>
      
      <div className="old-page-indicator">
        Page 1 of 4
      </div>
    </div>
  );
}

export default OldWayMock;
