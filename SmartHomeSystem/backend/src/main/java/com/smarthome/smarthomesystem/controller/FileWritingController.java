package com.smarthome.smarthomesystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
