package com.smarthome.smarthomesystem.subject;

import com.smarthome.smarthomesystem.observer.Observer;
import com.smarthome.smarthomesystem.subject.SmartHomeSecurity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.*;

class SmartHomeSecurityTest {

    private SmartHomeSecurity smartHomeSecurity;
    private Observer observer1;
    private Observer observer2;

    @BeforeEach
    void setUp() {
        smartHomeSecurity = new SmartHomeSecurity();
        observer1 = Mockito.mock(Observer.class);
        observer2 = Mockito.mock(Observer.class);
    }

    @Test
    void addObserver_ObserverAddedSuccessfully() {
        smartHomeSecurity.registerObserver(observer1);
        smartHomeSecurity.setAwayMode(true);

        verify(observer1).updateAwayMode(true);
    }

    @Test
    void removeObserver_ObserverRemovedSuccessfully() {
        smartHomeSecurity.registerObserver(observer1);
        smartHomeSecurity.removeObserver(observer1);
        smartHomeSecurity.setAwayMode(true);

        verify(observer1, times(0)).updateAwayMode(true);
    }

    @Test
    void notifyObservers_AllObserversNotified() {
        smartHomeSecurity.registerObserver(observer1);
        smartHomeSecurity.registerObserver(observer2);
        smartHomeSecurity.setAwayMode(false);

        verify(observer1).updateAwayMode(false);
        verify(observer2).updateAwayMode(false);
    }

}
