package com.smarthome.smarthomesystem.observer;

import com.smarthome.smarthomesystem.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SmartHomeHeater implements Observer {

    private final FileService fileService;

    @Autowired
    public SmartHomeHeater(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public void update(Double temperature) {
        System.out.println("Heater temperature updated to: " + temperature);

        // Conditions 1: temperature outside is cooler than inside a zone or room
        //               if and only if the temperature outside is not lower than 20 C

        // Condition 2: If the windows are blocked by an arbitrary object

        // Condition 3: If the temperature inside the home is <= zero degrees
        if (temperature <= 0) {
            fileService.writeToFile("\u26A0\ufe0f WARNING: Risk of pipes freezing! Turn on heater.");
        }
    }
}
