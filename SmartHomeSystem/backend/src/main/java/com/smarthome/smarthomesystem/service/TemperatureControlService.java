package com.smarthome.smarthomesystem.service;

import com.smarthome.smarthomesystem.domain.OutsideTemperature;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.repositories.OutsideTemperatureRepository;
import com.smarthome.smarthomesystem.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemperatureControlService {

    @Autowired
    private final RoomRepository roomRepository;

    private static OutsideTemperatureRepository temperatureRepository = null;
    private static OutsideTemperature outsideTemperatureInstance;

    @Autowired
    private TemperatureControlService(RoomRepository roomRepository, OutsideTemperatureRepository temperatureRepository) {
        this.roomRepository = roomRepository;
        this.temperatureRepository = temperatureRepository;
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

    public void updateRoomTemperature(Room room, double elapsedTime) {
        double outsideTemperature = getOutsideTemperature(); // Get the outside temperature from your TemperatureService or another source
        double desiredTemperature = room.getDesiredTemperature();

        double roomTemperature = room.getTemperature();
        boolean hvacWorking = room.getIsHvacWorking();

        double temperatureDifference = roomTemperature - desiredTemperature;

        if (!hvacWorking) {
            // HVAC not working
            if (roomTemperature < outsideTemperature) {
                roomTemperature += 0.05 * elapsedTime; // Increase temperature towards outside
            } else if (roomTemperature > outsideTemperature) {
                roomTemperature -= 0.05 * elapsedTime; // Decrease temperature towards outside
            }
        } else {
            // HVAC working
            if (Math.abs(temperatureDifference) >= 1.0) {
                // If temperature difference is >= 1°C, adjust temperature towards desired temperature
                if (temperatureDifference > 0) {
                    roomTemperature -= 0.1 * elapsedTime; // Reduce temperature
                } else {
                    roomTemperature += 0.1 * elapsedTime; // Increase temperature
                }
            } else {
                // If temperature difference is < 1°C, pause HVAC
                if (Math.abs(temperatureDifference) <= 0.25) {
                    room.setHvacWorking(false); // Pause HVAC
                }
            }
        }

        room.setTemperature(roomTemperature);
        roomRepository.save(room);
    }

    // You can add other methods as needed

    private double getOutsideTemperature() {
        return outsideTemperatureInstance.getTemperature();
    }
}
