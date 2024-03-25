package com.smarthome.smarthomesystem.service;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    private final DirectProcessor<ServerSentEvent<String>> logProcessor;
    private final FluxSink<ServerSentEvent<String>> logSink;

    public FileService() {
        this.logProcessor = DirectProcessor.create();
        this.logSink = logProcessor.sink();
        startStreamingLogs();
    }


    public ResponseEntity<String> writeToFile(String data) {
        String filename = "data.txt";
        String filePath = System.getProperty("user.dir") + File.separator + filename;

        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(data + System.lineSeparator());
            writer.flush();
            // Pass the written data through the logSink
            logSink.next(ServerSentEvent.builder(data).build());
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
            String filename = "exampleTemperature.csv";
            String filePath = System.getProperty("user.dir") + File.separator + filename;
            Path path = Paths.get(filePath);
            Files.write(path, bytes);

            return ResponseEntity.ok("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }

    public ResponseEntity<List<String[]>> getCSVData() {
        String filename = "exampleTemperature.csv";
        String filePath = System.getProperty("user.dir") + File.separator + filename;
        List<String[]> data = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                data.add(values);
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }

        return ResponseEntity.ok(data);
    }

    private void startStreamingLogs() {
        // Create a new thread to continuously emit log messages
        new Thread(() -> {
            List<String> logs = new ArrayList<>();
            while (true) {
                if (!logs.isEmpty()) {
                    logSink.next(ServerSentEvent.builder(logs.remove(0)).build());
                }
                // Introduce some delay between emissions (optional)
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public Flux<ServerSentEvent<String>> streamLogs() {
        return logProcessor;
    }

    public FluxSink<ServerSentEvent<String>> getLogSink() {
        return logSink;
    }


}
