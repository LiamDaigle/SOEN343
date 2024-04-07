package com.smarthome.smarthomesystem.subject;

import com.smarthome.smarthomesystem.observer.Observer;

import java.util.ArrayList;
import java.util.List;

public class SmartHomeSecurity implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private boolean isAwayMode;

    public void setAwayMode(boolean isAwayMode) {
        this.isAwayMode = isAwayMode;
        notifyObservers();
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
            observer.updateAwayMode(isAwayMode);
        }
    }

}