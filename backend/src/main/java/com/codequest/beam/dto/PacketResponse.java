package com.codequest.beam.dto;

import java.util.List;
import java.util.Map;

public record PacketResponse(
    Map<String, String> filledFields,
    String tailoredSummary,
    List<String> matchedSkills,
    int fieldsFilledCount,
    int estimatedTimeSavedSeconds
) {}
