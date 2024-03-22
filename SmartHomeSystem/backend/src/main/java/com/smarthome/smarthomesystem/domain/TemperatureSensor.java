package com.smarthome.smarthomesystem.domain;

import java.util.ArrayList;
import java.util.List;

public class TemperatureSensor {
    private List<TemperatureObserver> observers = new ArrayList<>();
    private double indoorTemperature;
    private double outdoorTemperature;

    public void addObserver(TemperatureObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(TemperatureObserver observer) {
        observers.remove(observer);
    }

    public void updateTemperatures(double indoorTemperature, double outdoorTemperature) {
        this.indoorTemperature = indoorTemperature;
        this.outdoorTemperature = outdoorTemperature;
        notifyObservers();
    }

    private void notifyObservers() {
        for (TemperatureObserver observer : observers) {
            observer.updateTemperature(indoorTemperature, outdoorTemperature);
        }
    }
}