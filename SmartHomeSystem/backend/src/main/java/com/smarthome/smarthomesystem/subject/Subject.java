package com.smarthome.smarthomesystem.subject;

import com.smarthome.smarthomesystem.observer.Observer;

public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();

    void notifyObserversAboutAwayMode();

    }


