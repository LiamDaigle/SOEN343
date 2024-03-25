package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.service.SimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class SimulationController {

    private final SimulationService simulationService;

    @Autowired
    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @PutMapping(path="api/simulation/{simulationId}/toggle")
    public ResponseEntity<Void> toggleSimulation(@PathVariable Long simulationId) {
        simulationService.toggleSimulation(simulationId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping(path ="api/simulation/{simulationId}/speed")
    public ResponseEntity<Void> updateSpeed(@PathVariable Long simulationId, @RequestBody Double speed) {
        simulationService.updateSpeed(simulationId, speed);
        return ResponseEntity.noContent().build();
    }
}
