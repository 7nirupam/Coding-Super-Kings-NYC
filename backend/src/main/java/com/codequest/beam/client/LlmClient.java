package com.codequest.beam.client;

import com.codequest.beam.config.ApiKeyConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Component
public class LlmClient {

    private final ApiKeyConfig apiKeyConfig;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    public LlmClient(ApiKeyConfig apiKeyConfig, ObjectMapper objectMapper) {
        this.apiKeyConfig = apiKeyConfig;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .build();
    }

    public String generateJsonResponse(String prompt) {
        try {
            Map<String, Object> requestBodyMap = Map.of(
                "model", "llama-3.3-70b-versatile", // Using Llama 3.3 70B for strong JSON and reasoning
                "messages", List.of(
                    Map.of(
                        "role", "user",
                        "content", prompt + "\n\nRespond with valid JSON only."
                    )
                ),
                "response_format", Map.of("type", "json_object")
            );

            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GROQ_API_URL))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKeyConfig.getApiKey())
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode rootNode = objectMapper.readTree(response.body());
                JsonNode textNode = rootNode
                        .path("choices")
                        .path(0)
                        .path("message")
                        .path("content");
                return textNode.asText();
            } else {
                throw new RuntimeException("LLM API failed with status " + response.statusCode() + ": " + response.body());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error calling LLM", e);
        }
    }
}
