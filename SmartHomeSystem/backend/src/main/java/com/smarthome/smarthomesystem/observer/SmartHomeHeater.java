package com.smarthome.smarthomesystem.observer;

import com.smarthome.smarthomesystem.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SmartHomeHeater implements Observer {

    public SmartHomeHeater() {
    }

    @Override
    public void update(Double temperature) {
        System.out.println("Heater temperature updated to: " + temperature);

        // Conditions 1: temperature outside is cooler than inside a zone or room
        //               if and only if the temperature outside is not lower than 20 C

        // Condition 2: If the windows are blocked by an arbitrary object

        // Condition 3: If the temperature inside the home is <= zero degrees
        if (temperature <= 0 )
        {
            System.out.println("WARNING: Risk of pipes freezing! Turn on heater.");
        }

    }


}
