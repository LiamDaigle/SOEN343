package com.smarthome.smarthomesystem.service;

import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemperatureControlService {

    @Autowired
    private final RoomRepository roomRepository;

    @Autowired
    public TemperatureControlService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
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
        // Implement logic to get outside temperature
        // This could be fetched from a service or external source
        // For demonstration purposes, returning a static value
        return 25.0;
    }
}
