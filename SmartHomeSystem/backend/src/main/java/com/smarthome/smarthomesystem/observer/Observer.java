package com.smarthome.smarthomesystem.observer;


import com.smarthome.smarthomesystem.domain.Room;

// Define the Observer interface
public interface Observer {
    void update(Double outsideTemperature, Double temperature, Long roomId);
}