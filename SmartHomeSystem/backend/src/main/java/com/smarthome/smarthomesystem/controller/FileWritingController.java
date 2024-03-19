package com.smarthome.smarthomesystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/files")
public class FileWritingController {

    @PostMapping("/write")
    public ResponseEntity<String> writeToFile(@RequestBody JsonNode requestBody) {
        String data = requestBody.get("data").asText();
        String filename = "data.txt";
        String filePath = System.getProperty("user.dir") + File.separator + filename;

        try (FileWriter writer = new FileWriter(filePath, true)) { // 'true' to append data
            writer.write(data + System.lineSeparator()); // Append a newline after each write
            writer.flush();
            return ResponseEntity.ok("Data written successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error writing data: " + e.getMessage());
        }
    }
}
