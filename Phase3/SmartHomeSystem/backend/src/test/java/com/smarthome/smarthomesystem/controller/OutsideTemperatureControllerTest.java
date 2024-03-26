package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.controller.OutsideTemperatureController;
import com.smarthome.smarthomesystem.service.TemperatureControlService;
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class OutsideTemperatureControllerTest {

    @Mock
    private TemperatureControlService temperatureControlService;

    @Mock
    private SimulatorSubject simulatorSubject;

    @InjectMocks
    private OutsideTemperatureController outsideTemperatureController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveOutsideTemperature() {
        // Arrange
        String temperature = "25.5";
        double parsedTemperature = Double.parseDouble(temperature);
        ResponseEntity<String> expectedResponse = ResponseEntity.ok("Outside temperature saved successfully.");

        // Act
        ResponseEntity<String> actualResponse = outsideTemperatureController.saveOutsideTemperature(temperature);

        // Assert
        assertEquals(expectedResponse, actualResponse);

        // Verify interactions
        verify(temperatureControlService).saveTemperature(parsedTemperature);
        verify(simulatorSubject).setOutsideTemperature(parsedTemperature);
        verify(simulatorSubject).notifyObservers();
    }

}
