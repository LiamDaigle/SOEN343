package com.smarthome.smarthomesystem.service;

import com.smarthome.smarthomesystem.domain.Home;
import com.smarthome.smarthomesystem.domain.OutsideTemperature;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Simulation;
import com.smarthome.smarthomesystem.repositories.HomeRepository;
import com.smarthome.smarthomesystem.repositories.OutsideTemperatureRepository;
import com.smarthome.smarthomesystem.repositories.RoomRepository;
import com.smarthome.smarthomesystem.repositories.SimulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import com.smarthome.smarthomesystem.service.FileService;

import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
public class TemperatureControlService {

    @Autowired
    private final RoomRepository roomRepository;

    @Autowired
    private final HomeRepository homeRepository;

    private FileService fileService;

    private static OutsideTemperatureRepository temperatureRepository = null;
    private SimulationRepository simulationRepo;
    private static OutsideTemperature outsideTemperatureInstance;

    @Autowired
    private TemperatureControlService(RoomRepository roomRepository, HomeRepository homeRepository, OutsideTemperatureRepository temperatureRepository, FileService fileService, SimulationRepository simulationRepository) {
        this.roomRepository = roomRepository;
        this.temperatureRepository = temperatureRepository;
        this.fileService = fileService;
        this.simulationRepo = simulationRepository;
        this.homeRepository = homeRepository;

    }

    @Autowired
    public void setFileService(FileService fileService) {
        this.fileService= fileService;
    }

    // skeleton public method
    public static OutsideTemperature getOutsideTemperatureInstance() {
        if (outsideTemperatureInstance == null) {
            // Retrieve existing instance if available, otherwise create a new one
            outsideTemperatureInstance = temperatureRepository.findById(1L).orElse(null);
            if (outsideTemperatureInstance == null) {
                outsideTemperatureInstance = new OutsideTemperature();
                outsideTemperatureInstance.setTemperature(-10.0); // Set initial temperature
                temperatureRepository.save(outsideTemperatureInstance);
            }
        }
        return outsideTemperatureInstance;
    }

    // Example method to save temperature
    public void saveTemperature(double temperature) {
        OutsideTemperature outsideTemperature = getOutsideTemperatureInstance();
        outsideTemperature.setTemperature(temperature);
        temperatureRepository.save(outsideTemperature);
    }

    // Enum representing the states of the temperature control system
    private enum HVACState {
        OFF,
        ON
    }

    public void updateRoomTemperature(Room room) {
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        double outsideTemperature = getOutsideTemperature();
        double desiredTemperature = room.getDesiredTemperature();
        double roomTemperature = room.getTemperature();
        boolean hvacWorking = room.getIsHvacWorking();

        Simulation simulation = simulationRepo.getSimulation(0L);
        boolean is_simulation_on = simulation.getOn();
        double speed = simulation.getSpeed();
        long consoleSpeed = (long) (1/speed);

        HVACState currentState;
        double count = 0;
        double startingTemperature = roomTemperature;

        if (hvacWorking) {
            currentState = HVACState.ON;
        } else {
            currentState = HVACState.OFF;
        }

        double temperatureDifference = roomTemperature - desiredTemperature;

        if (Math.abs(temperatureDifference) >= 1.0) {
            currentState = HVACState.ON;
        }

        if(getSimulationStatus()){
            fileService.writeToFile("Simulation speed is set to: "+ speed + "x");
            fileService.writeToFile("Desired Temperature is "+desiredTemperature);
        }

        while (getSimulationStatus() && count < 120) {
            try {
                TimeUnit.SECONDS.sleep(consoleSpeed);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            temperatureDifference = roomTemperature - desiredTemperature;

            switch (currentState) {

                case OFF:
                    if (Math.abs(temperatureDifference) >= 0.25) {
                        currentState = HVACState.ON;
                        fileService.writeToFile("HVAC is ON");
                        fileService.writeToFile("Room Temperature is " + roomTemperature);
                    } else if (roomTemperature < outsideTemperature) {
                        roomTemperature += 0.05;
                        roomTemperature = Math.min(roomTemperature, outsideTemperature);
                    } else if (roomTemperature > outsideTemperature) {
                        roomTemperature -= 0.05;
                        roomTemperature = Math.max(roomTemperature, outsideTemperature);
                    }
                    break;

                case ON:
                    if (temperatureDifference > 0) {
                        roomTemperature -= 0.1;
                    } else if (temperatureDifference < 0) {
                        roomTemperature += 0.1;
                    } else if (temperatureDifference == 0) {
                        currentState = HVACState.OFF;
                        fileService.writeToFile("HVAC is OFF");
                        fileService.writeToFile("Room Temperature is " + roomTemperature);
                    }
                    break;
            }

            roomTemperature = Math.round(roomTemperature * 1000.0) / 1000.0;

            if(roomTemperature >= 135){
                fileService.writeToFile("Temperature made it to 135 degrees Celsius... turning off away mode");
                Optional<Home> homeOptional = homeRepository.findById(0L);
                if(homeOptional.isPresent()){
                    Home home = homeOptional.get();
                    home.setAwayModeOn(false);
                    homeRepository.save(home);
                }
            }

            if(count <= 60 && (roomTemperature - startingTemperature) >= 15){
                fileService.writeToFile("Temperature increased by more than 15 in the last minute... turning off away mode");
                Optional<Home> homeOptional = homeRepository.findById(0L);
                if(homeOptional.isPresent()){
                    Home home = homeOptional.get();
                    home.setAwayModeOn(false);
                    homeRepository.save(home);
                }
            }

            fileService.writeToFile("Room Temperature: " + roomTemperature);
            Simulation simulationUpdate = simulationRepo.getSimulation(0L);
            is_simulation_on = simulationUpdate.getOn();
            room.setTemperature(roomTemperature);
            roomRepository.save(room);
            count++;
        }
        fileService.writeToFile("Simulation Off.");
    }

    private double getOutsideTemperature() {
        return outsideTemperatureInstance.getTemperature();
    }

    private boolean getSimulationStatus(){
        Simulation simulation = simulationRepo.getSimulation(0L);
        boolean is_simulation_on = simulation.getOn();
        System.out.println("inside method it is..."+ is_simulation_on);
        return is_simulation_on;
    }
}
