package com.smarthome.smarthomesystem.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;




import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.smarthome.smarthomesystem.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileWritingController {

    private final FileService fileService;

    public FileWritingController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamLogs() {
        return fileService.streamLogs();
    }

    @PostMapping("/write")
    public ResponseEntity<String> writeToFile(@RequestBody JsonNode requestBody) {
        String data = requestBody.get("data").asText();
        return fileService.writeToFile(data);
    }

    @GetMapping("/read")
    public ResponseEntity<List<String>> readLogs() {
        return fileService.readLogs();
    }

    @PostMapping("/uploadCSV")
    public ResponseEntity<String> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        return fileService.uploadCSVFile(file);
    }

    @GetMapping("/csvData")
    public ResponseEntity<List<String[]>> getCSVData() {
        return fileService.getCSVData();
    }
}
