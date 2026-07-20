const fs = require('fs');

async function callGroq() {
  const apiKey = "gsk_your_groq_api_key_here";
  const resumeText = fs.readFileSync("test_resume.txt", "utf8");
  const prompt = "Parse the following resume into JSON. The JSON must exactly match this schema: \n" +
  "{\n" +
  "  \"name\": \"string\",\n" +
  "  \"email\": \"string\",\n" +
  "  \"phone\": \"string\",\n" +
  "  \"education\": [{\"degree\": \"string\", \"institution\": \"string\", \"year\": \"string\"}],\n" +
  "  \"experience\": [{\"title\": \"string\", \"company\": \"string\", \"duration\": \"string\", \"highlights\": [\"string\"]}],\n" +
  "  \"skills\": [\"string\"],\n" +
  "  \"projects\": [{\"name\": \"string\", \"description\": \"string\"}]\n" +
  "}\n\n" +
  "Resume text:\n" + resumeText;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt + "\n\nRespond with valid JSON only." }],
      response_format: { type: "json_object" }
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

callGroq();
