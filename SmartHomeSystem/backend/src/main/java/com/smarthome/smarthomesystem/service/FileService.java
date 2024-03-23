package com.smarthome.smarthomesystem.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    public ResponseEntity<String> writeToFile(String data) {
        String filename = "data.txt";
        String filePath = System.getProperty("user.dir") + File.separator + filename;

        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(data + System.lineSeparator());
            writer.flush();
            return ResponseEntity.ok("Data written successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error writing data: " + e.getMessage());
        }
    }

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
                    logBuilder.setLength(0);
                } else {
                    logBuilder.append(line).append("\n");
                }
            }
            if (logBuilder.length() > 0) {
                logs.add(logBuilder.toString());
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }

        return ResponseEntity.ok(logs);
    }

    public ResponseEntity<String> uploadCSVFile(MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a file.");
        }

        try {
            byte[] bytes = file.getBytes();
            String filename = "temperature_data.csv";
            String filePath = System.getProperty("user.dir") + File.separator + filename;
            Path path = Paths.get(filePath);
            Files.write(path, bytes);

            return ResponseEntity.ok("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }
}
