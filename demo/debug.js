const fs = require('fs');

async function debugBackend() {
    try {
        console.log("1. Uploading resume...");
        const resumeText = fs.readFileSync('demo/test_resume.txt', 'utf-8');
        const formData = new FormData();
        const blob = new Blob([resumeText], { type: 'text/plain' });
        formData.append('file', blob, 'test_resume.txt');
        
        let res = await fetch('http://localhost:8081/api/resume/upload', {
            method: 'POST',
            body: formData
        });
        const resumeData = await res.json();
        console.log("Resume response:", JSON.stringify(resumeData, null, 2));

        console.log("\n2. Parsing job...");
        const jobText = "Seeking a Software Engineer with Java and Spring Boot experience.";
        res = await fetch('http://localhost:8081/api/job/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: jobText })
        });
        const jobData = await res.json();
        console.log("Job response:", JSON.stringify(jobData, null, 2));

        console.log("\n3. Generating packet...");
        res = await fetch('http://localhost:8081/api/packet/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume: resumeData, jobPosting: jobData })
        });
        const packetData = await res.json();
        console.log("\n====== RAW PACKET RESPONSE ======");
        console.log(JSON.stringify(packetData, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

debugBackend();
