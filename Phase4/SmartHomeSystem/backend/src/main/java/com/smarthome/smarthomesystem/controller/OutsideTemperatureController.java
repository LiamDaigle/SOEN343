package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.service.TemperatureControlService;
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OutsideTemperatureController {

    private final TemperatureControlService temperatureControlService;
    private final SimulatorSubject simulatorSubject;


    @Autowired
    public OutsideTemperatureController(TemperatureControlService temperatureControlService, SimulatorSubject simulatorSubject) {
        this.temperatureControlService = temperatureControlService;
        this.simulatorSubject = simulatorSubject;
    }

    @PostMapping("/temperature")
    public ResponseEntity<String> saveOutsideTemperature(@RequestBody String temperature) {
        temperatureControlService.saveTemperature(Double.parseDouble(temperature));
        simulatorSubject.setOutsideTemperature(Double.parseDouble(temperature));
        simulatorSubject.notifyObservers();
        return ResponseEntity.ok("Outside temperature saved successfully.");
    }
}
