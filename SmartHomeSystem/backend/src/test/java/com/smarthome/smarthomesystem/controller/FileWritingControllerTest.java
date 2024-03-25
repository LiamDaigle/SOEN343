package com.smarthome.smarthomesystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smarthome.smarthomesystem.controller.FileWritingController;
import com.smarthome.smarthomesystem.service.FileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FileWritingControllerTest {

    @Mock
    private FileService fileService;

    @InjectMocks
    private FileWritingController fileWritingController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void testReadLogs() {
        // Arrange
        List<String> logs = new ArrayList<>();
        logs.add("Log 1");
        logs.add("Log 2");
        ResponseEntity<List<String>> expectedResponse = ResponseEntity.ok(logs);

        when(fileService.readLogs()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<List<String>> actualResponse = fileWritingController.readLogs();

        // Assert
        verify(fileService).readLogs();
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void testUploadCSVFile() throws IOException {
        // Arrange
        String filename = "exampleTemperature.csv";
        byte[] content = "Test content".getBytes(StandardCharsets.UTF_8);
        MultipartFile multipartFile = new MockMultipartFile(filename, filename, "text/csv", content);
        ResponseEntity<String> expectedResponse = ResponseEntity.ok("File uploaded successfully");

        when(fileService.uploadCSVFile(multipartFile)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<String> actualResponse = fileWritingController.uploadCSVFile(multipartFile);

        // Assert
        verify(fileService).uploadCSVFile(multipartFile);
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void testGetCSVData() {
        // Arrange
        List<String[]> csvData = new ArrayList<>();
        csvData.add(new String[]{"value1", "value2"});
        csvData.add(new String[]{"value3", "value4"});
        ResponseEntity<List<String[]>> expectedResponse = ResponseEntity.ok(csvData);

        when(fileService.getCSVData()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<List<String[]>> actualResponse = fileWritingController.getCSVData();

        // Assert
        verify(fileService).getCSVData();
        assertEquals(expectedResponse, actualResponse);
    }
}
