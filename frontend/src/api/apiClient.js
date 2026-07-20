export const apiClient = {
  uploadResume: async (file) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      // Dummy Blob just to satisfy the multipart request in stub mode
      formData.append('file', new Blob(['stub'], { type: 'text/plain' }), 'stub.txt');
    }
    
    const res = await fetch('http://localhost:8080/api/resume/upload', {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  parseJob: async (text) => {
    const res = await fetch('http://localhost:8080/api/job/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return res.json();
  },

  generatePacket: async (resume, job) => {
    const res = await fetch('http://localhost:8080/api/packet/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, job })
    });
    return res.json();
  }
};
