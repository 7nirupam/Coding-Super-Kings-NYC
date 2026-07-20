import React, { useState, useEffect } from 'react';

function ProfilePage({ onNext }) {
  const [profile, setProfile] = useState(() => {
    const saved = sessionStorage.getItem('beam_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      fullName: '',
      email: '',
      phone: '',
      education: [{ degree: '', institution: '', year: '' }],
      experience: [{ title: '', company: '', duration: '', highlight: '' }],
      skills: [],
      projects: []
    };
  });

  const [currentSkill, setCurrentSkill] = useState('');

  // Save to sessionStorage on every change
  useEffect(() => {
    sessionStorage.setItem('beam_profile', JSON.stringify(profile));
  }, [profile]);

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const skill = currentSkill.trim();
      if (skill && !profile.skills.includes(skill)) {
        setProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        setCurrentSkill('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const updateArrayField = (arrayName, index, field, value) => {
    const newArray = [...profile[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setProfile(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (arrayName, emptyItem) => {
    setProfile(prev => ({ ...prev, [arrayName]: [...prev[arrayName], emptyItem] }));
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = [...profile[arrayName]];
    newArray.splice(index, 1);
    setProfile(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(profile);
  };

  return (
    <div className="page-layout upload-layout">
      <div className="onboarding-container" style={{maxWidth: '800px', margin: '0 auto', width: '100%'}}>
        <h1 className="hero-title">Build your <span className="highlight-gold">Profile.</span></h1>
        <p className="hero-subtitle">Type it once. Beam handles the rest.</p>
        
        <form onSubmit={handleSubmit} className="profile-form" style={{display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '40px', textAlign: 'left'}}>
          
          {/* Basic Info */}
          <section className="form-section">
            <h2 style={{color: 'var(--paper)', fontSize: '20px', marginBottom: '16px'}}>Basic Info</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <input type="text" placeholder="Full Name" required className="input-url" value={profile.fullName} onChange={e => updateField('fullName', e.target.value)} />
              <input type="email" placeholder="Email" required className="input-url" value={profile.email} onChange={e => updateField('email', e.target.value)} />
              <input type="tel" placeholder="Phone" required className="input-url" value={profile.phone} onChange={e => updateField('phone', e.target.value)} style={{gridColumn: '1 / -1'}} />
            </div>
          </section>

          {/* Education */}
          <section className="form-section">
            <h2 style={{color: 'var(--paper)', fontSize: '20px', marginBottom: '16px'}}>Education</h2>
            {profile.education.map((edu, idx) => (
              <div key={idx} style={{display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center'}}>
                <input type="text" placeholder="Degree (e.g. B.S. Computer Science)" className="input-url" style={{flex: 2}} value={edu.degree} onChange={e => updateArrayField('education', idx, 'degree', e.target.value)} />
                <input type="text" placeholder="Institution" className="input-url" style={{flex: 2}} value={edu.institution} onChange={e => updateArrayField('education', idx, 'institution', e.target.value)} />
                <input type="text" placeholder="Year" className="input-url" style={{flex: 1}} value={edu.year} onChange={e => updateArrayField('education', idx, 'year', e.target.value)} />
                {idx > 0 && <button type="button" onClick={() => removeArrayItem('education', idx)} style={{background: 'transparent', color: 'var(--graphite)', border: 'none', cursor: 'pointer'}}>✕</button>}
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={() => addArrayItem('education', {degree: '', institution: '', year: ''})} style={{alignSelf: 'flex-start'}}>+ Add Education</button>
          </section>

          {/* Experience */}
          <section className="form-section">
            <h2 style={{color: 'var(--paper)', fontSize: '20px', marginBottom: '16px'}}>Work Experience</h2>
            {profile.experience.map((exp, idx) => (
              <div key={idx} style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', position: 'relative'}}>
                {idx > 0 && <button type="button" onClick={() => removeArrayItem('experience', idx)} style={{position: 'absolute', top: '12px', right: '12px', background: 'transparent', color: 'var(--graphite)', border: 'none', cursor: 'pointer'}}>✕</button>}
                <div style={{display: 'flex', gap: '12px'}}>
                  <input type="text" placeholder="Title" className="input-url" style={{flex: 1}} value={exp.title} onChange={e => updateArrayField('experience', idx, 'title', e.target.value)} />
                  <input type="text" placeholder="Company" className="input-url" style={{flex: 1}} value={exp.company} onChange={e => updateArrayField('experience', idx, 'company', e.target.value)} />
                  <input type="text" placeholder="Duration (e.g. 2020-2023)" className="input-url" style={{flex: 1}} value={exp.duration} onChange={e => updateArrayField('experience', idx, 'duration', e.target.value)} />
                </div>
                <input type="text" placeholder="One-line highlight of your impact" className="input-url" value={exp.highlight} onChange={e => updateArrayField('experience', idx, 'highlight', e.target.value)} />
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={() => addArrayItem('experience', {title: '', company: '', duration: '', highlight: ''})} style={{alignSelf: 'flex-start'}}>+ Add Experience</button>
          </section>

          {/* Skills */}
          <section className="form-section">
            <h2 style={{color: 'var(--paper)', fontSize: '20px', marginBottom: '16px'}}>Skills</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px'}}>
              {profile.skills.map((skill, idx) => (
                <div key={idx} className="match-chip" style={{display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--beam-gold)', color: 'var(--ink)'}}>
                  {skill}
                  <span onClick={() => removeSkill(skill)} style={{cursor: 'pointer', opacity: 0.6}}>✕</span>
                </div>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Type a skill and press Enter (e.g. Java, React, Docker)" 
              className="input-url" 
              value={currentSkill}
              onChange={e => setCurrentSkill(e.target.value)}
              onKeyDown={handleAddSkill}
            />
          </section>

          <button type="submit" className="btn-primary" style={{marginTop: '16px', alignSelf: 'center', minWidth: '200px'}}>
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
