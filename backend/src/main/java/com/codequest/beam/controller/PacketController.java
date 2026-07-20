package com.codequest.beam.controller;

import com.codequest.beam.dto.PacketRequest;
import com.codequest.beam.dto.PacketResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/packet")
public class PacketController {

    private final com.codequest.beam.service.PacketGeneratorService packetGeneratorService;

    public PacketController(com.codequest.beam.service.PacketGeneratorService packetGeneratorService) {
        this.packetGeneratorService = packetGeneratorService;
    }

    @PostMapping("/generate")
    public PacketResponse generatePacket(@RequestBody PacketRequest request) {
        return packetGeneratorService.generatePacket(request.resume(), request.job());
    }
}
