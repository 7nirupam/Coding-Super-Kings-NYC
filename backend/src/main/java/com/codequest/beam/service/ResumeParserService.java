package com.codequest.beam.service;

import com.codequest.beam.client.LlmClient;
import com.codequest.beam.model.Resume;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class ResumeParserService {

    private final LlmClient llmClient;
    private final ObjectMapper objectMapper;

    public ResumeParserService(LlmClient llmClient, ObjectMapper objectMapper) {
        this.llmClient = llmClient;
        this.objectMapper = objectMapper;
    }

    public Resume parseResume(MultipartFile file) {
        try {
            String text = extractText(file);
            String prompt = "Parse the following resume into JSON. The JSON must exactly match this schema: \n" +
                    "{\n" +
                    "  \"name\": \"string\",\n" +
                    "  \"email\": \"string\",\n" +
                    "  \"phone\": \"string\",\n" +
                    "  \"education\": [{\"degree\": \"string\", \"institution\": \"string\", \"year\": \"string\"}],\n" +
                    "  \"experience\": [{\"title\": \"string\", \"company\": \"string\", \"duration\": \"string\", \"highlights\": [\"string\"]}],\n" +
                    "  \"skills\": [\"string\"],\n" +
                    "  \"projects\": [{\"name\": \"string\", \"description\": \"string\"}]\n" +
                    "}\n\n" +
                    "Resume text:\n" + text;

            String jsonResponse = llmClient.generateJsonResponse(prompt);
            jsonResponse = jsonResponse.replaceAll("^```json\\s*", "").replaceAll("\\s*```$", "").trim();
            System.out.println("LLM Response: " + jsonResponse);
            return objectMapper.readValue(jsonResponse, Resume.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse resume", e);
        }
    }

    private String extractText(MultipartFile file) throws Exception {
        if (file.getOriginalFilename() != null && file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
            try (InputStream is = file.getInputStream();
                 PDDocument document = org.apache.pdfbox.Loader.loadPDF(is.readAllBytes())) {
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(document);
            }
        } else {
            return new String(file.getBytes());
        }
    }
}
