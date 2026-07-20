package com.codequest.beam.dto;

import com.codequest.beam.model.JobPosting;
import com.codequest.beam.model.Resume;

public record PacketRequest(
    Resume resume,
    JobPosting job
) {}
