package com.codequest.beam.controller;

import com.codequest.beam.dto.JobInputRequest;
import com.codequest.beam.model.JobPosting;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job")
public class JobController {

    private final com.codequest.beam.service.JobParserService jobParserService;

    public JobController(com.codequest.beam.service.JobParserService jobParserService) {
        this.jobParserService = jobParserService;
    }

    @PostMapping("/parse")
    public JobPosting parseJob(@RequestBody JobInputRequest request) {
        return jobParserService.parseJob(request.text());
    }
}
