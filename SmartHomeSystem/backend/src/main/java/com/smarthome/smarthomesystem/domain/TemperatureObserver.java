package com.smarthome.smarthomesystem.domain;

public interface TemperatureObserver {
    public void updateTemperature(double indoorTemperature, double outdoorTemperature);
}
