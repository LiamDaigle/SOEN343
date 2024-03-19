package com.smarthome.smarthomesystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/read")
    public ResponseEntity<List<String>> readLogs() {
        String filename = "data.txt";
        String filePath = System.getProperty("user.dir") + File.separator + filename;
        List<String> logs = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            StringBuilder logBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.equals("end")) {
                    logs.add(logBuilder.toString());
                    logBuilder.setLength(0); // Clear the StringBuilder
                } else {
                    logBuilder.append(line).append("\n");
                }
            }
            // Add the last log if it hasn't been added yet
            if (logBuilder.length() > 0) {
                logs.add(logBuilder.toString());
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }

        return ResponseEntity.ok(logs);
    }
}
