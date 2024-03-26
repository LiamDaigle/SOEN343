package com.smarthome.smarthomesystem.service;

import com.smarthome.smarthomesystem.domain.Simulation;
import com.smarthome.smarthomesystem.repositories.SimulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimulationService {

    private final SimulationRepository simulationRepository;

    @Autowired
    public SimulationService(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public Simulation toggleSimulation(Long simulationId) {
        Simulation simulation = simulationRepository.findById(simulationId)
                .orElseThrow(() -> new IllegalArgumentException("Simulation not found with id: " + simulationId));

        simulation.setOn(!simulation.getOn());
        return simulationRepository.save(simulation);
    }

    public Simulation updateSpeed(Long simulationId, Double speed) {
        Simulation simulation = simulationRepository.findById(simulationId)
                .orElseThrow(() -> new IllegalArgumentException("Simulation not found with id: " + simulationId));

        if (speed == null) {
            throw new IllegalArgumentException("Speed cannot be null");
        }

        simulation.setSpeed(speed);
        return simulationRepository.save(simulation);
    }

}

