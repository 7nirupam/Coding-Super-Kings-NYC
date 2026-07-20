package com.codequest.beam.model;

import java.util.List;

public record JobPosting(
    String title,
    String company,
    List<String> requiredFields,
    List<String> keyRequirements
) {}
