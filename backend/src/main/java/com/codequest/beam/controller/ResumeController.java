package com.codequest.beam.controller;

import com.codequest.beam.model.Resume;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final com.codequest.beam.service.ResumeParserService resumeParserService;

    public ResumeController(com.codequest.beam.service.ResumeParserService resumeParserService) {
        this.resumeParserService = resumeParserService;
    }

    @PostMapping("/upload")
    public Resume uploadResume(@RequestParam("file") MultipartFile file) {
        return resumeParserService.parseResume(file);
    }
}
