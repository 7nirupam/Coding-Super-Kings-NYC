const fs = require('fs');

async function testBackend() {
  console.log("=== BEAM BACKEND QA TEST ===");
  const baseUrl = "http://localhost:8080/api";

  try {
    console.log("\n1. Testing POST /api/resume/upload");
    const formData = new FormData();
    const resumeText = fs.readFileSync("test_resume.txt", "utf8");
    const blob = new Blob([resumeText], { type: 'text/plain' });
    formData.append("file", blob, "test_resume.txt");

    let start = Date.now();
    let res = await fetch(`${baseUrl}/resume/upload`, {
      method: 'POST',
      body: formData
    });
    let data = await res.json();
    let duration = Date.now() - start;
    console.log(`Time: ${duration}ms, Status: ${res.status}`);
    console.log("Response:", JSON.stringify(data, null, 2));
    
    if (res.status !== 200 || !data.name) {
      console.log("❌ Resume Upload Failed or invalid shape");
      return;
    }
    const resumeObj = data;

    console.log("\n2. Testing POST /api/job/parse");
    const jobText = fs.readFileSync("sample-job-postings.md", "utf8");
    start = Date.now();
    res = await fetch(`${baseUrl}/job/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: jobText })
    });
    data = await res.json();
    duration = Date.now() - start;
    console.log(`Time: ${duration}ms, Status: ${res.status}`);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (res.status !== 200 || !data.title) {
      console.log("❌ Job Parse Failed or invalid shape");
      return;
    }
    const jobObj = data;

    console.log("\n3. Testing POST /api/packet/generate");
    start = Date.now();
    res = await fetch(`${baseUrl}/packet/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume: resumeObj, job: jobObj })
    });
    data = await res.json();
    duration = Date.now() - start;
    console.log(`Time: ${duration}ms, Status: ${res.status}`);
    console.log("Response:", JSON.stringify(data, null, 2));
    
    if (res.status !== 200 || !data.filledFields) {
      console.log("❌ Packet Generate Failed or invalid shape");
      return;
    }
    
    console.log("\n✅ ALL TESTS COMPLETED SUCCESSFULLY");
  } catch (err) {
    console.error("Test execution failed:", err);
  }
}

testBackend();
