package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileWritingController {

    private final FileService fileService;

    @Autowired
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
}
