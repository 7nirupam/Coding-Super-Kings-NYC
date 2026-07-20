package com.codequest.beam.model;

import java.util.List;

public record Resume(
    String name,
    String email,
    String phone,
    List<Education> education,
    List<Experience> experience,
    List<String> skills,
    List<Project> projects
) {
    public record Education(String degree, String institution, String year) {}
    public record Experience(String title, String company, String duration, List<String> highlights) {}
    public record Project(String name, String description) {}
}
