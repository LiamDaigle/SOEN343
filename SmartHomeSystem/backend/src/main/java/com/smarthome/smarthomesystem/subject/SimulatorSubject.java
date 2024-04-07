package com.smarthome.smarthomesystem.subject;

import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.observer.Observer;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SimulatorSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();

    private Double outsideTemperature;

    @Setter
    private Double temperature;

    private boolean isAwayMode;

    private Long roomId;

    public void setHvacWorking(Boolean hvacWorking) {
        isHvacWorking = hvacWorking;
    }

    private Boolean isHvacWorking;

    public boolean isAwayMode() {
        return isAwayMode;
    }

    public void setAwayMode(boolean isAwayMode) {
        this.isAwayMode = isAwayMode;
        notifyObserversAboutAwayMode();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(outsideTemperature, temperature, roomId);
        }
    }
    @Override
    public void notifyObserversAboutAwayMode() {
        for (Observer observer : observers) {
            observer.updateAwayMode(isAwayMode);
            System.out.println("observer: " + observer.toString());
        }
    }


    public Double getOutsideTemperature() {
        return outsideTemperature;
    }

    public void setOutsideTemperature(Double outsideTemperature) {
        this.outsideTemperature = outsideTemperature;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public List<Observer> getObservers() {
        return observers;
    }

    public void setObservers(List<Observer> observers) {
        this.observers = observers;
    }
}
