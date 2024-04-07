package com.smarthome.smarthomesystem.observer;

import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.repositories.RoomRepository;
import com.smarthome.smarthomesystem.repositories.WindowRepository;
import com.smarthome.smarthomesystem.service.FileService;
import com.smarthome.smarthomesystem.service.TemperatureControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
public class SmartHomeHeater implements Observer {
    private boolean isAwayMode = false;

    private final FileService fileService;
    private TemperatureControlService tempControl;

    @Autowired
    private WindowRepository windoRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    public SmartHomeHeater(FileService fileService) {
        this.fileService = fileService;

    }

    @Autowired
    public void setTempControl(TemperatureControlService tempControl) {
        this.tempControl = tempControl;
    }

    @Override
    public void updateAwayMode(boolean isAwayMode) {
        this.isAwayMode = isAwayMode;
    }
    // temperature is inside temperature
    @Override
    public void update(Double outsideTemperature, Double temperature, Long roomId) {

        if (isAwayMode) {
            // TODO: Logic to handle when away mode is on
            return;
        }

        System.out.println("Heater temperature updated to: " + temperature);
       // If the temperature inside the home is <= zero degrees
        if (temperature != null && temperature <= 0 ) {
            fileService.writeToFile("\u26A0\ufe0f WARNING: Risk of pipes freezing! Turn on heater.");
        }
        /*
        if the temperature inside a zone or room is warmer than the temperature outside but
        the temperature outside is no less than 20 degrees C, then the windows are to be opened.
        But if they are blocked then the system must notify the user and cancel the command
         */
        if (temperature != null && temperature > TemperatureControlService.getOutsideTemperatureInstance().getTemperature()
                && TemperatureControlService.getOutsideTemperatureInstance().getTemperature() >= 20) {
            Room optionalRoom = roomRepo.findById(roomId).orElse(null);

            if (optionalRoom != null) {
                List<Optional<Window>> windows = windoRepo.findWindowsByRoom(optionalRoom);
                if (!windows.isEmpty()) {
                    Optional<Window> firstWindowOptional = windows.get(0);
                    if (firstWindowOptional.isPresent()) {
                        Window firstWindow = firstWindowOptional.get();
                        boolean isBlocked = firstWindow.getIsBlocked();
                        if(isBlocked)
                        {
                            fileService.writeToFile("Window is blocked. Command to open window is CANCELLED.\n");
                        }
                        else
                        {
                            if(!firstWindow.isOpen())
                            {
                                firstWindow.setOpen(true);
                                windoRepo.save(firstWindow);
                                fileService.writeToFile("Window for Room " + firstWindow.getRoom().getName() + " has opened\n");
                            }
                        }
                    } else {
                        System.out.println("First window is not present");
                    }
                } else {
                    System.out.println("No windows found for the room");
                }
            }
        }

    }

}

