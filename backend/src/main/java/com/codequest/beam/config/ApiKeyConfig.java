package com.codequest.beam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {

    @Value("${llm.api.key}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}
