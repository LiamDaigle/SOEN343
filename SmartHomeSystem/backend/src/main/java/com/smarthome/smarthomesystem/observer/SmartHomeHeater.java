package com.smarthome.smarthomesystem.observer;

import com.smarthome.smarthomesystem.service.FileService;
import com.smarthome.smarthomesystem.service.TemperatureControlService;
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

        /*
        if the temperature inside a zone or room is warmer than the temperature outside but
        the temperature outside is no less than 20 degrees C, then the windows are to be opened.
        But if they are blocked then the system must notify the user and cancel the command
         */
        if (temperature > TemperatureControlService.getOutsideTemperatureInstance().getTemperature()
                && TemperatureControlService.getOutsideTemperatureInstance().getTemperature() >= 20) {

        }

        // Condition 3: If the temperature inside the home is <= zero degrees
        if (temperature <= 0) {
            fileService.writeToFile("\u26A0\ufe0f WARNING: Risk of pipes freezing! Turn on heater.");
        }
    }
}

