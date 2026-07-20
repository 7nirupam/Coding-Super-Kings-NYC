package com.codequest.beam.service;

import com.codequest.beam.client.LlmClient;
import com.codequest.beam.model.JobPosting;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class JobParserService {

    private final LlmClient llmClient;
    private final ObjectMapper objectMapper;

    public JobParserService(LlmClient llmClient, ObjectMapper objectMapper) {
        this.llmClient = llmClient;
        this.objectMapper = objectMapper;
    }

    public JobPosting parseJob(String jobText) {
        try {
            String prompt = "Parse the following job posting into JSON. Identify the core requirements and output the fields typically required in an application form. The JSON must exactly match this schema: \n" +
                    "{\n" +
                    "  \"title\": \"string\",\n" +
                    "  \"company\": \"string\",\n" +
                    "  \"requiredFields\": [\"string\"],\n" +
                    "  \"keyRequirements\": [\"string\"]\n" +
                    "}\n\n" +
                    "Job Posting Text:\n" + jobText;

            String jsonResponse = llmClient.generateJsonResponse(prompt);
            int startIndex = jsonResponse.indexOf('{');
            int endIndex = jsonResponse.lastIndexOf('}');
            if (startIndex != -1 && endIndex != -1) {
                jsonResponse = jsonResponse.substring(startIndex, endIndex + 1);
            }
            return objectMapper.readValue(jsonResponse, JobPosting.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse job posting", e);
        }
    }
}
