export const SKILLS_DICTIONARY = [
  "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Ruby", "Go", "Rust", "Swift", "Kotlin", "PHP",
  "Spring Boot", "React", "Angular", "Vue.js", "Node.js", "Express", "Django", "Flask", "Ruby on Rails", "ASP.NET",
  "HTML", "CSS", "TailwindCSS", "Sass", "Bootstrap",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "DynamoDB",
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins", "GitHub Actions",
  "Git", "RESTful APIs", "GraphQL", "Microservices", "Agile", "Scrum",
  "Machine Learning", "Data Science", "Pandas", "NumPy", "TensorFlow", "PyTorch",
  "Communication", "Leadership", "Problem Solving", "Teamwork"
];

// Helper to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const extractSkills = (text) => {
  const foundSkills = new Set();
  
  SKILLS_DICTIONARY.forEach(skill => {
    const escapedSkill = escapeRegExp(skill);
    const startBoundary = /^[\w]/.test(skill) ? '\\b' : '(?<=\\s|^)';
    const endBoundary = /[\w]$/.test(skill) ? '\\b' : '(?=\\s|$)';
    
    const regex = new RegExp(`${startBoundary}${escapedSkill}${endBoundary}`, 'i');
    if (regex.test(text)) {
      foundSkills.add(skill);
    }
  });
  
  return Array.from(foundSkills);
};

export const extractRequiredFields = (text) => {
  const fields = new Set();
  const lower = text.toLowerCase();
  
  // Basic defaults for most jobs
  fields.add("Name");
  fields.add("Email");
  fields.add("Phone");
  fields.add("Resume");
  
  // Look for other common requests
  if (lower.includes("cover letter") || lower.includes("summary")) {
    fields.add("Cover Letter");
  }
  if (lower.includes("portfolio") || lower.includes("github") || lower.includes("website")) {
    fields.add("Portfolio URL");
  }
  if (lower.includes("linkedin")) {
    fields.add("LinkedIn Profile");
  }
  
  return Array.from(fields);
};

export const parseJob = (text) => {
  return {
    title: "Target Role", 
    company: "Target Company",
    requiredFields: extractRequiredFields(text),
    keyRequirements: extractSkills(text)
  };
};

export const generatePacket = (profile, job) => {
  const profileSkillsLower = (profile.skills || []).map(s => s.toLowerCase());
  
  const matchedSkills = [];
  const missingSkills = [];
  
  (job.keyRequirements || []).forEach(req => {
    if (profileSkillsLower.includes(req.toLowerCase())) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });
  
  // Map fields deterministically
  const filledFields = {};
  if (profile.fullName) filledFields.fullName = profile.fullName;
  if (profile.email) filledFields.email = profile.email;
  if (profile.phone) filledFields.phone = profile.phone;
  
  if (profile.education && profile.education.length > 0) {
    filledFields.education = profile.education.map(e => `${e.degree}, ${e.institution} (${e.year})`).join('\n');
  }
  
  if (profile.experience && profile.experience.length > 0) {
    filledFields.experience = profile.experience.map(e => `${e.title} at ${e.company} (${e.duration}). ${e.highlight}`).join('\n\n');
  }
  
  // Generate Cover Letter Snippet
  let coverLetter = "";
  if (matchedSkills.length > 0) {
    const skillsString = matchedSkills.join(', ');
    coverLetter = `I'm excited to apply for this role. With experience in ${skillsString}`;
    if (profile.experience && profile.experience.length > 0) {
      coverLetter += `, including my work as a ${profile.experience[0].title} at ${profile.experience[0].company}`;
    }
    coverLetter += `, I'm confident I'd contribute quickly to your team.`;
  } else {
    coverLetter = `I'm excited to apply for this role and believe my background would make me a great fit for your team.`;
  }
  
  filledFields.coverLetter = coverLetter;
  
  let readinessScore = 0;
  if (job.keyRequirements && job.keyRequirements.length > 0) {
    readinessScore = Math.round((matchedSkills.length / job.keyRequirements.length) * 100);
  } else if (matchedSkills.length > 0) {
    readinessScore = 100;
  }

  return {
    filledFields,
    matchedSkills,
    missingSkills,
    fieldsFilledCount: Object.keys(filledFields).length,
    estimatedTimeSavedSeconds: Object.keys(filledFields).length * 15,
    tailoredSummary: coverLetter,
    readinessScore,
    jobRequiredSkillsCount: job.keyRequirements ? job.keyRequirements.length : 0
  };
};
