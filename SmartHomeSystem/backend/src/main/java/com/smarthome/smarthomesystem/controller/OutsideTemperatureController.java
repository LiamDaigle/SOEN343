package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.service.TemperatureControlService;
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

    @Autowired
    public OutsideTemperatureController(TemperatureControlService temperatureControlService) {
        this.temperatureControlService = temperatureControlService;
    }

    @PostMapping("/temperature")
    public ResponseEntity<String> saveOutsideTemperature(@RequestBody String temperature) {
        temperatureControlService.saveTemperature(Double.parseDouble(temperature));
        return ResponseEntity.ok("Outside temperature saved successfully.");
    }
}
