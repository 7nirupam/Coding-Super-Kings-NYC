package com.codequest.beam.service;

import com.codequest.beam.client.LlmClient;
import com.codequest.beam.dto.PacketResponse;
import com.codequest.beam.model.JobPosting;
import com.codequest.beam.model.Resume;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class PacketGeneratorService {

    private final LlmClient llmClient;
    private final ObjectMapper objectMapper;

    public PacketGeneratorService(LlmClient llmClient, ObjectMapper objectMapper) {
        this.llmClient = llmClient;
        this.objectMapper = objectMapper;
    }

    public PacketResponse generatePacket(Resume resume, JobPosting job) {
        try {
            String prompt = "You are a highly intelligent application assistant. I will provide you with a Resume in JSON format, and a Job Posting in JSON format. " +
                    "Your task is to map the fields from the Resume to the required fields for the Job Posting. " +
                    "Also, write a short tailored summary (2-3 sentences) matching the candidate's experience to the job's key requirements, to act as a cover letter snippet. " +
                    "Also, identify matched skills. " +
                    "Finally, provide the count of fields you were able to fill, and calculate the estimated time saved (assume 15 seconds per filled field). " +
                    "Output the result EXACTLY as this JSON schema: \n" +
                    "{\n" +
                    "  \"filledFields\": { \"fieldName1\": \"value1\", \"fieldName2\": \"value2\" },\n" +
                    "  \"tailoredSummary\": \"string\",\n" +
                    "  \"matchedSkills\": [\"string\"],\n" +
                    "  \"fieldsFilledCount\": 0,\n" +
                    "  \"estimatedTimeSavedSeconds\": 0\n" +
                    "}\n\n" +
                    "Resume JSON:\n" + objectMapper.writeValueAsString(resume) + "\n\n" +
                    "Job Posting JSON:\n" + objectMapper.writeValueAsString(job);

            String jsonResponse = llmClient.generateJsonResponse(prompt);
            jsonResponse = jsonResponse.replaceAll("^```json\\s*", "").replaceAll("\\s*```$", "").trim();
            return objectMapper.readValue(jsonResponse, PacketResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate application packet", e);
        }
    }
}
